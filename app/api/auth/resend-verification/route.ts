import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Find user by email
    const userResult = await sql`
      SELECT id, is_verified 
      FROM users 
      WHERE email = ${email}
    `

    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: "No account found with this email" }, { status: 404 })
    }

    const user = userResult.rows[0]

    // Check if user is already verified
    if (user.is_verified) {
      return NextResponse.json({ error: "Email is already verified. Please log in." }, { status: 400 })
    }

    // Generate new verification token
    const verificationToken = uuidv4()
    const tokenExpiry = new Date()
    tokenExpiry.setHours(tokenExpiry.getHours() + 24) // Token valid for 24 hours

    // Update user with new verification token
    await sql`
      UPDATE users 
      SET verification_token = ${verificationToken},
          verification_token_expires = ${tokenExpiry},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${user.id}
    `

    // Log verification link (in a real app, you would send an email)
    console.log(`
      =============== VERIFICATION EMAIL ===============
      To: ${email}
      Subject: Verify your MedSecOp account
      
      Hello,
      
      Please verify your email by clicking the link below:
      
      ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/verify?token=${verificationToken}&email=${encodeURIComponent(email)}
      
      This link will expire in 24 hours.
      
      If you did not register for MedSecOp, please ignore this email.
      
      Best regards,
      The MedSecOp Team
      ===============================================
    `)

    return NextResponse.json({
      success: true,
      message: "Verification email sent successfully",
    })
  } catch (error) {
    console.error("Resend verification error:", error)
    return NextResponse.json({ error: "An error occurred while resending the verification email" }, { status: 500 })
  }
}

