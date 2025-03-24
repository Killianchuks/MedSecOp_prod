import { NextResponse } from "next/server"
import { db, cases, users } from "@/lib/db"
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
    const { doctorId } = body

    // Validate required fields
    if (!doctorId) {
      return NextResponse.json({ message: "Doctor ID is required" }, { status: 400 })
    }

    // Check if the case exists
    const existingCase = await db.select().from(cases).where(eq(cases.id, caseId)).limit(1)
    if (existingCase.length === 0) {
      return NextResponse.json({ message: "Case not found" }, { status: 404 })
    }

    // Check if the doctor exists and is a doctor
    const doctor = await db.select().from(users).where(eq(users.id, doctorId)).limit(1)
    if (doctor.length === 0) {
      return NextResponse.json({ message: "Doctor not found" }, { status: 404 })
    }

    if (doctor[0].role !== "DOCTOR") {
      return NextResponse.json({ message: "Selected user is not a doctor" }, { status: 400 })
    }

    // Update the case
    await db
      .update(cases)
      .set({
        doctorId,
        status: "ASSIGNED",
        updatedAt: new Date(),
      })
      .where(eq(cases.id, caseId))

    return NextResponse.json({
      message: "Case assigned successfully",
    })
  } catch (error) {
    console.error("Error assigning case:", error)
    return NextResponse.json({ message: "An error occurred while assigning the case" }, { status: 500 })
  }
}

