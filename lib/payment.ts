import Stripe from "stripe"
import { withTransaction } from "./db"
import { logAuditEvent } from "./audit"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
)

// Initialize Stripe with the latest API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-03-31.basil" as Stripe.LatestApiVersion,
})

// Payment status enum
export enum PaymentStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
  PARTIALLY_REFUNDED = "partially_refunded",
  DISPUTED = "disputed",
}

// Payment method enum
export enum PaymentMethod {
  CREDIT_CARD = "credit_card",
  PAYPAL = "paypal",
  APPLE_PAY = "apple_pay",
  BANK_TRANSFER = "bank_transfer",
  INSURANCE = "insurance",
}

// Payment interface
export interface Payment {
  id: string
  userId: string
  amount: number
  currency: string
  status: PaymentStatus
  method: PaymentMethod
  description: string
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

// Create a payment intent
export async function createPaymentIntent(
  amount: number,
  currency = "usd",
  userId: string,
  metadata: Record<string, any> = {},
): Promise<{ clientSecret: string | null; error: string | null }> {
  try {
    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        userId,
        ...metadata,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    // Log the payment intent creation
    await logAuditEvent(userId, "payment_intent_created", {
      payment_intent_id: paymentIntent.id,
      amount,
      currency,
    })

    return { clientSecret: paymentIntent.client_secret, error: null }
  } catch (error: any) {
    console.error("Payment intent creation error:", error)
    return { clientSecret: null, error: error.message || "Failed to create payment intent" }
  }
}

// Process a payment
export async function processPayment(
  paymentIntentId: string,
  userId: string,
  description: string,
  metadata: Record<string, any> = {},
): Promise<{ payment: Payment | null; error: string | null }> {
  try {
    // Retrieve the payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status !== "succeeded") {
      return { payment: null, error: `Payment not successful. Status: ${paymentIntent.status}` }
    }

    // Record the payment in our database
    return await withTransaction(async (client) => {
      // Insert payment record
      const result = await client.query(
        `INSERT INTO payments (
          user_id, amount, currency, status, method, description, metadata, stripe_payment_intent_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [
          userId,
          paymentIntent.amount / 100, // Convert from cents
          paymentIntent.currency,
          PaymentStatus.COMPLETED,
          getPaymentMethod(paymentIntent),
          description,
          metadata,
          paymentIntentId,
        ],
      )

      const payment = result.rows[0]

      // Log the payment
      await logAuditEvent(userId, "payment_processed", {
        payment_id: payment.id,
        payment_intent_id: paymentIntentId,
        amount: payment.amount,
        currency: payment.currency,
      })

      return {
        payment: {
          id: payment.id,
          userId: payment.user_id,
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
          method: payment.method,
          description: payment.description,
          metadata: payment.metadata,
          createdAt: payment.created_at,
          updatedAt: payment.updated_at,
        },
        error: null,
      }
    })
  } catch (error: any) {
    console.error("Payment processing error:", error)
    return { payment: null, error: error.message || "Failed to process payment" }
  }
}

// Helper to determine payment method from Stripe payment intent
function getPaymentMethod(paymentIntent: Stripe.PaymentIntent): PaymentMethod {
  const paymentMethodId = paymentIntent.payment_method
  if (!paymentMethodId) return PaymentMethod.CREDIT_CARD // Default

  // This would need to be expanded based on actual payment method types
  if (paymentIntent.payment_method_types.includes("apple_pay")) {
    return PaymentMethod.APPLE_PAY
  }

  return PaymentMethod.CREDIT_CARD
}

// Issue a refund
export async function issueRefund(
  paymentId: string,
  amount: number | null = null, // null for full refund
  reason = "requested_by_customer",
): Promise<{ success: boolean; error: string | null }> {
  try {
    return await withTransaction(async (client) => {
      // Get the payment record
      const paymentResult = await client.query("SELECT * FROM payments WHERE id = $1", [paymentId])

      if (paymentResult.rows.length === 0) {
        return { success: false, error: "Payment not found" }
      }

      const payment = paymentResult.rows[0]

      // Check if payment can be refunded
      if (payment.status !== PaymentStatus.COMPLETED) {
        return { success: false, error: `Cannot refund payment with status: ${payment.status}` }
      }

      // Process refund with Stripe
      const refundAmount = amount !== null ? Math.round(amount * 100) : undefined
      const refund = await stripe.refunds.create({
        payment_intent: payment.stripe_payment_intent_id,
        amount: refundAmount,
        reason: reason as Stripe.RefundCreateParams.Reason,
      })

      // Update payment status
      const newStatus =
        amount !== null && amount < payment.amount ? PaymentStatus.PARTIALLY_REFUNDED : PaymentStatus.REFUNDED

      await client.query("UPDATE payments SET status = $1, updated_at = NOW() WHERE id = $2", [newStatus, paymentId])

      // Record the refund
      await client.query(
        `INSERT INTO refunds (
          payment_id, amount, reason, stripe_refund_id, status
        ) VALUES ($1, $2, $3, $4, $5)`,
        [paymentId, refundAmount ? refundAmount / 100 : payment.amount, reason, refund.id, refund.status],
      )

      // Log the refund
      await logAuditEvent(payment.user_id, "payment_refunded", {
        payment_id: paymentId,
        refund_id: refund.id,
        amount: refundAmount ? refundAmount / 100 : payment.amount,
        reason,
      })

      return { success: true, error: null }
    })
  } catch (error: any) {
    console.error("Refund processing error:", error)
    return { success: false, error: error.message || "Failed to process refund" }
  }
}

// Get payment methods for a user
export async function getUserPaymentMethods(userId: string): Promise<any[]> {
  try {
    // Get customer ID from our database
    const { data: userData, error } = await supabaseAdmin
      .from("user_profiles")
      .select("stripe_customer_id")
      .eq("id", userId)
      .single()

    if (error || !userData?.stripe_customer_id) {
      return []
    }

    // Get payment methods from Stripe
    const paymentMethods = await stripe.paymentMethods.list({
      customer: userData.stripe_customer_id,
      type: "card",
    })

    return paymentMethods.data.map((method) => ({
      id: method.id,
      type: method.type,
      card: method.card
        ? {
            brand: method.card.brand,
            last4: method.card.last4,
            expMonth: method.card.exp_month,
            expYear: method.card.exp_year,
          }
        : undefined,
      billingDetails: method.billing_details,
    }))
  } catch (error) {
    console.error("Error fetching payment methods:", error)
    return []
  }
}
