import { type NextRequest, NextResponse } from "next/server"
import { hashPassword } from "@/lib/db"
import { supabaseAdmin } from "@/lib/db"
import { logAuditEvent } from "@/lib/audit"

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()

    // Validate required fields
    if (!body.email || !body.password || !body.firstName || !body.lastName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate password
    if (body.password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from("user_profiles")
      .select("id")
      .eq("email", body.email)
      .maybeSingle()

    if (checkError) {
      console.error("Error checking existing user:", checkError)
      return NextResponse.json({ error: "An error occurred while checking user existence" }, { status: 500 })
    }

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash the password
    const { hash, salt } = hashPassword(body.password)

    // Create user in Supabase Auth
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: body.email,
      password: body.password,
      email_confirm: true,
    })

    if (authError) {
      console.error("Error creating auth user:", authError)
      return NextResponse.json({ error: "Failed to create user account" }, { status: 500 })
    }

    // Create user profile
    const { data: userProfile, error: profileError } = await supabaseAdmin
      .from("user_profiles")
      .insert({
        id: authUser.user.id,
        email: body.email,
        first_name: body.firstName,
        last_name: body.lastName,
        password_hash: hash,
        password_salt: salt,
        role: "patient",
        is_verified: true,
        marketing_opt_in: body.marketingOptIn || false,
      })
      .select()
      .single()

    if (profileError) {
      console.error("Error creating user profile:", profileError)
      // Attempt to clean up the auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authUser.user.id)
      return NextResponse.json({ error: "Failed to create user profile" }, { status: 500 })
    }

    // Log the registration
    await logAuditEvent(authUser.user.id, "patient_registered", {
      email: body.email,
    })

    // Return success response
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: authUser.user.id,
          email: body.email,
          firstName: body.firstName,
          lastName: body.lastName,
          role: "patient",
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "An unexpected error occurred during registration" }, { status: 500 })
  }
}

