import { NextResponse } from "next/server"
import { db, cases, users } from "@/lib/db"
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
    const status = searchParams.get("status")
    const priority = searchParams.get("priority")
    const search = searchParams.get("search")

    // Build the query
    let query = db
      .select({
        ...cases,
        patient: {
          firstName: users.firstName,
          lastName: users.lastName,
          email: users.email,
        },
      })
      .from(cases)
      .leftJoin(users, eq(cases.patientId, users.id))

    // Add filters if provided
    if (status) {
      query = query.where(eq(cases.status, status as any))
    }

    if (priority) {
      query = query.where(eq(cases.priority, priority as any))
    }

    if (search) {
      query = query.where(like(cases.title, `%${search}%`) || like(cases.description, `%${search}%`))
    }

    // Execute the query
    const result = await query

    // Get doctor information for cases that have a doctor assigned
    const casesWithDoctors = await Promise.all(
      result.map(async (caseItem) => {
        let doctor = null

        if (caseItem.doctorId) {
          const doctorResult = await db
            .select({
              firstName: users.firstName,
              lastName: users.lastName,
              email: users.email,
            })
            .from(users)
            .where(eq(users.id, caseItem.doctorId))
            .limit(1)

          if (doctorResult.length > 0) {
            doctor = doctorResult[0]
          }
        }

        return {
          ...caseItem,
          doctor,
        }
      }),
    )

    // Return the cases
    return NextResponse.json({
      cases: casesWithDoctors,
    })
  } catch (error) {
    console.error("Error fetching cases:", error)
    return NextResponse.json({ message: "An error occurred while fetching cases" }, { status: 500 })
  }
}

