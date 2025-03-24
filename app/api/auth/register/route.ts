import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { createHash, randomBytes } from "crypto"
import { v4 as uuidv4 } from "uuid"

// Function to hash a password
function hashPassword(password: string, salt: string): string {
  return createHash("sha256")
    .update(password + salt)
    .digest("hex")
}

// Function to generate a salt
function generateSalt(): string {
  return randomBytes(16).toString("hex")
}

export async function POST(request: NextRequest) {
  try {
    console.log("Registration API called")

    // Parse the request body
    const body = await request.json()
    console.log(
      "Request body received:",
      JSON.stringify({
        ...body,
        password: "[REDACTED]",
      }),
    )

    const { email, password, firstName, lastName, role } = body

    // Validate input
    if (!email || !password || !firstName || !lastName || !role) {
      console.log("Missing required fields:", {
        email: !!email,
        password: !!password,
        firstName: !!firstName,
        lastName: !!lastName,
        role: !!role,
      })
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if email already exists
    console.log("Checking if email exists:", email)
    const existingUserQuery = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    console.log("Existing user query result:", existingUserQuery)

    if (existingUserQuery.rows && existingUserQuery.rows.length > 0) {
      console.log("Email already registered:", email)
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    // Generate salt and hash password
    const salt = generateSalt()
    const hashedPassword = hashPassword(password, salt)
    console.log("Password hashed successfully")

    // Generate verification token
    const verificationToken = uuidv4()
    const tokenExpiry = new Date()
    tokenExpiry.setHours(tokenExpiry.getHours() + 24) // Token valid for 24 hours
    console.log("Verification token generated:", verificationToken)

    // Check if users table exists
    console.log("Checking if users table exists")
    try {
      const tableCheck = await sql`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public'
          AND table_name = 'users'
        )
      `
      console.log("Table check result:", tableCheck)

      if (!tableCheck.rows[0].exists) {
        console.log("Users table does not exist, creating it")
        await sql`
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            password_salt VARCHAR(255) NOT NULL,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            role VARCHAR(50) NOT NULL,
            is_verified BOOLEAN DEFAULT FALSE,
            verification_token VARCHAR(255),
            verification_token_expires TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP,
            license_number VARCHAR(255)
          )
        `
        console.log("Users table created successfully")
      }
    } catch (tableError) {
      console.error("Error checking/creating users table:", tableError)
    }

    // Create user with verification token
    console.log("Creating new user:", email)
    try {
      const result = await sql`
        INSERT INTO users (
          email, 
          password_hash, 
          password_salt, 
          first_name, 
          last_name, 
          role, 
          is_verified, 
          verification_token, 
          verification_token_expires,
          license_number
        )
        VALUES (
          ${email}, 
          ${hashedPassword}, 
          ${salt}, 
          ${firstName}, 
          ${lastName}, 
          ${role}, 
          false, 
          ${verificationToken}, 
          ${tokenExpiry},
          ${role === "DOCTOR" ? body.licenseNumber || null : null}
        )
        RETURNING id
      `

      console.log("User created successfully:", result)
      const userId = result.rows[0]?.id

      // Send verification email (simplified for now)
      console.log("Would send verification email to:", email)
      console.log(
        "Verification link would be:",
        `/api/auth/verify?token=${verificationToken}&email=${encodeURIComponent(email)}`,
      )

      return NextResponse.json({
        success: true,
        message: "Registration successful. Please check your email to verify your account.",
        userId,
      })
    } catch (insertError) {
      console.error("Error inserting user:", insertError)
      return NextResponse.json({ error: `Database error: ${insertError.message || "Unknown error"}` }, { status: 500 })
    }
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "An error occurred during registration" }, { status: 500 })
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

