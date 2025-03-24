import { NextResponse } from "next/server"
import { db, cases } from "@/lib/db"
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

    // Get the case ID from the params
    const caseId = Number.parseInt(params.id)

    // Parse the request body
    const body = await req.json()
    const { status } = body

    // Validate required fields
    if (!status) {
      return NextResponse.json({ message: "Status is required" }, { status: 400 })
    }

    // Check if the status is valid
    const validStatuses = ["PENDING", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 })
    }

    // Check if the case exists
    const existingCase = await db.select().from(cases).where(eq(cases.id, caseId)).limit(1)
    if (existingCase.length === 0) {
      return NextResponse.json({ message: "Case not found" }, { status: 404 })
    }

    // Prepare the update data
    const updateData: any = {
      status: status as any,
      updatedAt: new Date(),
    }

    // If the status is COMPLETED, set the completedAt date
    if (status === "COMPLETED") {
      updateData.completedAt = new Date()
    }

    // Update the case
    await db.update(cases).set(updateData).where(eq(cases.id, caseId))

    return NextResponse.json({
      message: "Case status updated successfully",
    })
  } catch (error) {
    console.error("Error updating case status:", error)
    return NextResponse.json({ message: "An error occurred while updating the case status" }, { status: 500 })
  }
}

