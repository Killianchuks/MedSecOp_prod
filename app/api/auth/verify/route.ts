import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // Get token and email from query parameters
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get("token")
    const email = searchParams.get("email")

    if (!token || !email) {
      return NextResponse.redirect(new URL("/auth/verification-failed", request.url))
    }

    // Find user with matching token and email
    const result = await sql`
      SELECT id, verification_token_expires 
      FROM users 
      WHERE email = ${email} 
      AND verification_token = ${token}
      AND is_verified = false
    `

    if (result.rows.length === 0) {
      return NextResponse.redirect(new URL("/auth/verification-failed", request.url))
    }

    const user = result.rows[0]

    // Check if token has expired
    const tokenExpiry = new Date(user.verification_token_expires)
    if (tokenExpiry < new Date()) {
      return NextResponse.redirect(new URL("/auth/verification-expired", request.url))
    }

    // Mark user as verified
    await sql`
      UPDATE users 
      SET is_verified = true, 
          verification_token = null, 
          verification_token_expires = null,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${user.id}
    `

    // Redirect to success page
    return NextResponse.redirect(new URL("/auth/verification-success", request.url))
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.redirect(new URL("/auth/verification-failed", request.url))
  }
}

