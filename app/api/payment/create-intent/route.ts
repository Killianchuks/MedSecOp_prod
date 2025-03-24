import { type NextRequest, NextResponse } from "next/server"
import { withAuth, UserRole } from "@/lib/auth"
import { createPaymentIntent } from "@/lib/payment"

export const POST = withAuth(
  async (req: NextRequest, user) => {
    try {
      const body = await req.json()
      const { amount, currency = "usd", metadata = {} } = body

      // Validate input
      if (!amount || isNaN(Number.parseFloat(amount))) {
        return NextResponse.json({ error: "Valid amount is required" }, { status: 400 })
      }

      // Create payment intent
      const { clientSecret, error } = await createPaymentIntent(Number.parseFloat(amount), currency, user.id, metadata)

      if (error || !clientSecret) {
        return NextResponse.json({ error: error || "Failed to create payment intent" }, { status: 400 })
      }

      return NextResponse.json({ clientSecret }, { status: 200 })
    } catch (error: any) {
      console.error("Payment intent creation error:", error)
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
    }
  },
  [UserRole.PATIENT, UserRole.ADMIN],
)

