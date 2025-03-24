import { NextResponse } from "next/server"
import { db, users, hashPassword, generateSalt } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { eq, like } from "drizzle-orm"

export async function GET(req: Request) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser()

    // Check if the user is an admin
    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const role = searchParams.get("role")
    const search = searchParams.get("search")

    // Build the query
    let query = db.select().from(users)

    // Add filters if provided
    if (role) {
      query = query.where(eq(users.role, role))
    }

    if (search) {
      query = query.where(
        like(users.firstName, `%${search}%`) || like(users.lastName, `%${search}%`) || like(users.email, `%${search}%`),
      )
    }

    // Execute the query
    const result = await query

    // Return the users (excluding sensitive information)
    return NextResponse.json({
      users: result.map((user) => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        licenseNumber: user.licenseNumber,
        isActive: user.isActive,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
      })),
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ message: "An error occurred while fetching users" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser()

    // Check if the user is an admin
    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Parse the request body
    const body = await req.json()
    const { email, firstName, lastName, role, licenseNumber, password } = body

    // Validate required fields
    if (!email || !firstName || !lastName || !role || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Check if the email is already in use
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)
    if (existingUser.length > 0) {
      return NextResponse.json({ message: "Email is already in use" }, { status: 400 })
    }

    // Create the user
    const salt = generateSalt()
    const hash = hashPassword(password, salt)

    const result = await db
      .insert(users)
      .values({
        email,
        firstName,
        lastName,
        role: role as any,
        licenseNumber,
        passwordHash: hash,
        passwordSalt: salt,
      })
      .returning({ id: users.id })

    return NextResponse.json(
      {
        message: "User created successfully",
        userId: result[0].id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ message: "An error occurred while creating the user" }, { status: 500 })
  }
}

