import { type NextRequest, NextResponse } from "next/server"
import { withAuth, UserRole } from "@/lib/auth"
import { getMedicalCase, updateMedicalCase } from "@/lib/medical-cases"
import type { CaseStatus } from "@/types/medical-case"

// Get a specific case
export const GET = withAuth(
  async (req: NextRequest, user) => {
    try {
      // Extract case ID from URL
      const caseId = req.url.split("/").pop()

      if (!caseId) {
        return NextResponse.json({ error: "Case ID is required" }, { status: 400 })
      }

      // Get the case
      const { case: medicalCase, error } = await getMedicalCase(caseId, user)

      if (error || !medicalCase) {
        return NextResponse.json(
          { error: error || "Case not found" },
          { status: error === "Case not found" ? 404 : 400 },
        )
      }

      return NextResponse.json({ case: medicalCase }, { status: 200 })
    } catch (error: any) {
      console.error("Case retrieval error:", error)
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
    }
  },
  [UserRole.PATIENT, UserRole.DOCTOR, UserRole.ADMIN],
)

// Update a case
export const PATCH = withAuth(
  async (req: NextRequest, user) => {
    try {
      // Extract case ID from URL
      const caseId = req.url.split("/").pop()

      if (!caseId) {
        return NextResponse.json({ error: "Case ID is required" }, { status: 400 })
      }

      const body = await req.json()

      // Update the case
      const { success, error } = await updateMedicalCase(caseId, body, user)

      if (!success) {
        return NextResponse.json({ error: error || "Failed to update case" }, { status: 400 })
      }

      // Get the updated case
      const { case: updatedCase } = await getMedicalCase(caseId, user)

      return NextResponse.json({ message: "Case updated successfully", case: updatedCase }, { status: 200 })
    } catch (error: any) {
      console.error("Case update error:", error)
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
    }
  },
  [UserRole.PATIENT, UserRole.DOCTOR, UserRole.ADMIN],
)

// Delete a case (soft delete)
export const DELETE = withAuth(
  async (req: NextRequest, user) => {
    try {
      // Extract case ID from URL
      const caseId = req.url.split("/").pop()

      if (!caseId) {
        return NextResponse.json({ error: "Case ID is required" }, { status: 400 })
      }

      // Soft delete by updating status to CANCELLED
      const { success, error } = await updateMedicalCase(caseId, { status: "cancelled" as CaseStatus }, user)

      if (!success) {
        return NextResponse.json({ error: error || "Failed to delete case" }, { status: 400 })
      }

      return NextResponse.json({ message: "Case deleted successfully" }, { status: 200 })
    } catch (error: any) {
      console.error("Case deletion error:", error)
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
    }
  },
  [UserRole.PATIENT, UserRole.ADMIN],
)

