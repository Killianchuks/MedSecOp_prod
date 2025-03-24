import { type NextRequest, NextResponse } from "next/server"
import { withAuth, UserRole } from "@/lib/auth"
import { processPayment } from "@/lib/payment"

export const POST = withAuth(
  async (req: NextRequest, user) => {
    try {
      const body = await req.json()
      const { paymentIntentId, description, metadata = {} } = body

      // Validate input
      if (!paymentIntentId) {
        return NextResponse.json({ error: "Payment intent ID is required" }, { status: 400 })
      }

      if (!description) {
        return NextResponse.json({ error: "Description is required" }, { status: 400 })
      }

      // Process the payment
      const { payment, error } = await processPayment(paymentIntentId, user.id, description, metadata)

      if (error || !payment) {
        return NextResponse.json({ error: error || "Failed to process payment" }, { status: 400 })
      }

      return NextResponse.json(
        {
          message: "Payment processed successfully",
          payment,
        },
        { status: 200 },
      )
    } catch (error: any) {
      console.error("Payment processing error:", error)
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
    }
  },
  [UserRole.PATIENT, UserRole.ADMIN],
)

