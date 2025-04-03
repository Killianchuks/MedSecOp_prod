import { type NextRequest, NextResponse } from "next/server"
import { sql, verifyPassword } from "@/lib/db"
import { SignJWT } from "jose"
import { cookies } from "next/headers"

// Define the SQL result type
interface SqlResult {
  rows: any[]
}

// Define the user type
interface User {
  id: string
  email: string
  password_hash: string
  password_salt: string
  first_name: string
  last_name: string
  role: string
  is_verified: boolean
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Get user from database
    const result = (await sql`
      SELECT id, email, password_hash, password_salt, first_name, last_name, role, is_verified
      FROM users
      WHERE email = ${email}
    `) as SqlResult

    const user = result.rows[0] as User | undefined

    // Check if user exists
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Check if user is verified
    if (!user.is_verified) {
      return NextResponse.json(
        { error: "Please verify your email before logging in", needsVerification: true },
        { status: 403 },
      )
    }

    // Verify password
    const isPasswordValid = verifyPassword(password, user.password_hash, user.password_salt)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Create JWT token
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "fallback-secret-do-not-use-in-production")
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret)

    // Update last login timestamp
    await sql`
      UPDATE users
      SET last_login = NOW()
      WHERE id = ${user.id}
    `

    // Set cookie
    cookies().set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      sameSite: "lax",
    })

    // Return user info (without sensitive data)
    return NextResponse.json({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
  }
}

// Add OPTIONS method for CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}

