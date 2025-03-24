import { NextResponse } from "next/server"
import { db, settings, users } from "@/lib/db"
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
    const search = searchParams.get("search")

    // Build the query
    let query = db
      .select({
        ...settings,
        updatedBy: {
          firstName: users.firstName,
          lastName: users.lastName,
        },
      })
      .from(settings)
      .leftJoin(users, eq(settings.updatedBy, users.id))

    // Add filters if provided
    if (search) {
      query = query.where(
        like(settings.key, `%${search}%`) ||
          like(settings.value, `%${search}%`) ||
          like(settings.description, `%${search}%`),
      )
    }

    // Execute the query
    const result = await query

    // Return the settings
    return NextResponse.json({
      settings: result,
    })
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ message: "An error occurred while fetching settings" }, { status: 500 })
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
    const { key, value, description } = body

    // Validate required fields
    if (!key || !value) {
      return NextResponse.json({ message: "Key and value are required" }, { status: 400 })
    }

    // Check if the key already exists
    const existingSetting = await db.select().from(settings).where(eq(settings.key, key)).limit(1)
    if (existingSetting.length > 0) {
      return NextResponse.json({ message: "Setting with this key already exists" }, { status: 400 })
    }

    // Create the setting
    const result = await db
      .insert(settings)
      .values({
        key,
        value,
        description,
        updatedBy: Number.parseInt(currentUser.id),
      })
      .returning({ id: settings.id })

    return NextResponse.json(
      {
        message: "Setting created successfully",
        settingId: result[0].id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating setting:", error)
    return NextResponse.json({ message: "An error occurred while creating the setting" }, { status: 500 })
  }
}

