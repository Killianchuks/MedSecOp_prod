import { NextResponse } from "next/server"
import { db, users, hashPassword, generateSalt } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { eq } from "drizzle-orm"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser()

    // Check if the user is an admin
    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Get the user ID from the params
    const userId = Number.parseInt(params.id)

    // Get the user from the database
    const result = await db.select().from(users).where(eq(users.id, userId)).limit(1)

    // Check if the user exists
    if (result.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const user = result[0]

    // Return the user (excluding sensitive information)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        licenseNumber: user.licenseNumber,
        isActive: user.isActive,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
      },
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ message: "An error occurred while fetching the user" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser()

    // Check if the user is an admin
    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Get the user ID from the params
    const userId = Number.parseInt(params.id)

    // Parse the request body
    const body = await req.json()
    const { email, firstName, lastName, role, licenseNumber, password } = body

    // Validate required fields
    if (!email || !firstName || !lastName || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Check if the user exists
    const existingUser = await db.select().from(users).where(eq(users.id, userId)).limit(1)
    if (existingUser.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Prepare the update data
    const updateData: any = {
      email,
      firstName,
      lastName,
      role: role as any,
      licenseNumber,
      updatedAt: new Date(),
    }

    // If a new password is provided, hash it
    if (password) {
      const salt = generateSalt()
      const hash = hashPassword(password, salt)
      updateData.passwordHash = hash
      updateData.passwordSalt = salt
    }

    // Update the user
    await db.update(users).set(updateData).where(eq(users.id, userId))

    return NextResponse.json({
      message: "User updated successfully",
    })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ message: "An error occurred while updating the user" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser()

    // Check if the user is an admin
    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Get the user ID from the params
    const userId = Number.parseInt(params.id)

    // Check if the user exists
    const existingUser = await db.select().from(users).where(eq(users.id, userId)).limit(1)
    if (existingUser.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Delete the user
    await db.delete(users).where(eq(users.id, userId))

    return NextResponse.json({
      message: "User deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ message: "An error occurred while deleting the user" }, { status: 500 })
  }
}

