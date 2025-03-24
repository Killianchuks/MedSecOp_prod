import { type NextRequest, NextResponse } from "next/server"
import { withAuth, UserRole } from "@/lib/auth"
import { createMedicalCase, getUserMedicalCases, CaseStatus } from "@/lib/medical-cases"

// Create a new medical case
export const POST = withAuth(
  async (req: NextRequest, user) => {
    try {
      // Only patients can create cases
      if (user.role !== UserRole.PATIENT) {
        return NextResponse.json({ error: "Only patients can create cases" }, { status: 403 })
      }

      const body = await req.json()

      // Validate required fields
      if (!body.title || !body.description || !body.specialty) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
      }

      // Create the case
      const { case: newCase, error } = await createMedicalCase(
        {
          title: body.title,
          description: body.description,
          specialty: body.specialty,
          status: CaseStatus.DRAFT,
          priority: body.priority,
          paymentId: body.paymentId,
          medicalHistory: body.medicalHistory,
          medications: body.medications,
          allergies: body.allergies,
          symptoms: body.symptoms,
          notes: body.notes,
          reviewPackage: body.reviewPackage,
          preferredLanguage: body.preferredLanguage,
          videoConsultation: body.videoConsultation,
        },
        user.id,
      )

      if (error || !newCase) {
        return NextResponse.json({ error: error || "Failed to create case" }, { status: 400 })
      }

      return NextResponse.json({ message: "Case created successfully", case: newCase }, { status: 201 })
    } catch (error: any) {
      console.error("Case creation error:", error)
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
    }
  },
  [UserRole.PATIENT],
)

// Get cases for the current user
export const GET = withAuth(
  async (req: NextRequest, user) => {
    try {
      // Parse query parameters
      const url = new URL(req.url)
      const status = url.searchParams.get("status") as CaseStatus | undefined
      const limit = Number.parseInt(url.searchParams.get("limit") || "10")
      const offset = Number.parseInt(url.searchParams.get("offset") || "0")

      // Get cases
      const { cases, total, error } = await getUserMedicalCases(user, status, limit, offset)

      if (error) {
        return NextResponse.json({ error }, { status: 400 })
      }

      return NextResponse.json(
        {
          cases,
          pagination: {
            total,
            limit,
            offset,
            hasMore: offset + cases.length < total,
          },
        },
        { status: 200 },
      )
    } catch (error: any) {
      console.error("Cases retrieval error:", error)
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
    }
  },
  [UserRole.PATIENT, UserRole.DOCTOR, UserRole.ADMIN],
)

