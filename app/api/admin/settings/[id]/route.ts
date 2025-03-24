import { NextResponse } from "next/server"
import { db, settings } from "@/lib/db"
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

    // Get the setting ID from the params
    const settingId = Number.parseInt(params.id)

    // Get the setting from the database
    const result = await db.select().from(settings).where(eq(settings.id, settingId)).limit(1)

    // Check if the setting exists
    if (result.length === 0) {
      return NextResponse.json({ message: "Setting not found" }, { status: 404 })
    }

    // Return the setting
    return NextResponse.json({
      setting: result[0],
    })
  } catch (error) {
    console.error("Error fetching setting:", error)
    return NextResponse.json({ message: "An error occurred while fetching the setting" }, { status: 500 })
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

    // Get the setting ID from the params
    const settingId = Number.parseInt(params.id)

    // Parse the request body
    const body = await req.json()
    const { value, description } = body

    // Validate required fields
    if (!value) {
      return NextResponse.json({ message: "Value is required" }, { status: 400 })
    }

    // Check if the setting exists
    const existingSetting = await db.select().from(settings).where(eq(settings.id, settingId)).limit(1)
    if (existingSetting.length === 0) {
      return NextResponse.json({ message: "Setting not found" }, { status: 404 })
    }

    // Update the setting
    await db
      .update(settings)
      .set({
        value,
        description,
        updatedAt: new Date(),
        updatedBy: Number.parseInt(currentUser.id),
      })
      .where(eq(settings.id, settingId))

    return NextResponse.json({
      message: "Setting updated successfully",
    })
  } catch (error) {
    console.error("Error updating setting:", error)
    return NextResponse.json({ message: "An error occurred while updating the setting" }, { status: 500 })
  }
}

