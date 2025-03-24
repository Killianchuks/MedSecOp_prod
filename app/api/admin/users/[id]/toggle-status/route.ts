import { NextResponse } from "next/server"
import { db, users } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { eq } from "drizzle-orm"

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

    // Check if the user exists
    const existingUser = await db.select().from(users).where(eq(users.id, userId)).limit(1)
    if (existingUser.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Toggle the user's active status
    await db
      .update(users)
      .set({
        isActive: !existingUser[0].isActive,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))

    return NextResponse.json({
      message: "User status toggled successfully",
      isActive: !existingUser[0].isActive,
    })
  } catch (error) {
    console.error("Error toggling user status:", error)
    return NextResponse.json({ message: "An error occurred while toggling user status" }, { status: 500 })
  }
}

