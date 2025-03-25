import { NextResponse } from "next/server"
import { db, cases, users } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { eq, like, and, or } from "drizzle-orm"

export async function GET(req: Request) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const priority = searchParams.get("priority")
    const search = searchParams.get("search")

    // Build conditions array
    const conditions = []

    if (status) conditions.push(eq(cases.status, status as any))
    if (priority) conditions.push(eq(cases.priority, priority as any))
    if (search) {
      conditions.push(
        or(
          like(cases.title, `%${search}%`),
          like(cases.description, `%${search}%`)
        )
      )
    }

    // Execute the query in a single step
    const result = await db
      .select({
        id: cases.id,
        patientId: cases.patientId,
        doctorId: cases.doctorId,
        title: cases.title,
        description: cases.description,
        status: cases.status,
        priority: cases.priority,
        createdAt: cases.createdAt,
        updatedAt: cases.updatedAt,
        completedAt: cases.completedAt,
        patient: {
          firstName: users.firstName,
          lastName: users.lastName,
          email: users.email,
        },
      })
      .from(cases)
      .leftJoin(users, eq(cases.patientId, users.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)

    const casesWithDoctors = await Promise.all(
      result.map(async (caseItem) => {
        let doctor = null
        if (caseItem.doctorId) {
          const [doctorResult] = await db
            .select({
              firstName: users.firstName,
              lastName: users.lastName,
              email: users.email,
            })
            .from(users)
            .where(eq(users.id, caseItem.doctorId))
            .limit(1)

          doctor = doctorResult || null
        }

        return {
          ...caseItem,
          doctor,
        }
      }),
    )

    return NextResponse.json({
      cases: casesWithDoctors,
    })
  } catch (error) {
    console.error("Error fetching cases:", error)
    return NextResponse.json({ message: "An error occurred while fetching cases" }, { status: 500 })
  }
}
