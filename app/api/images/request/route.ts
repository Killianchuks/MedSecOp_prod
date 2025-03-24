import { type NextRequest, NextResponse } from "next/server"
import { withAuth, UserRole } from "@/lib/auth"
import { createImageRequest } from "@/lib/medical-images"

export const POST = withAuth(
  async (req: NextRequest, user) => {
    try {
      const body = await req.json()
      const { caseId, facilityName, facilityEmail, facilityPhone, imageType, studyDate, notes } = body

      // Validate required fields
      if (!facilityName || !facilityEmail || !imageType) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
      }

      // Create the image request
      const { request, error } = await createImageRequest(
        {
          caseId,
          facilityName,
          facilityEmail,
          facilityPhone,
          imageType,
          studyDate,
          notes,
        },
        user.id,
      )

      if (error || !request) {
        return NextResponse.json({ error: error || "Failed to create image request" }, { status: 400 })
      }

      return NextResponse.json(
        {
          message: "Image request created successfully",
          request: {
            ...request,
            // Don't expose the secure token in the response
            secureUploadToken: undefined,
          },
        },
        { status: 201 },
      )
    } catch (error: any) {
      console.error("Image request creation error:", error)
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
    }
  },
  [UserRole.PATIENT],
)

