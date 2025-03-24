import { type NextRequest, NextResponse } from "next/server"
import { validateUploadToken, uploadMedicalImage } from "@/lib/medical-images"

export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
  try {
    const token = params.token

    // Validate the upload token
    const { requestId, patientId, error } = await validateUploadToken(token)

    if (error || !requestId || !patientId) {
      return NextResponse.json({ error: error || "Invalid upload token" }, { status: 401 })
    }

    // Get the form data with the file
    const formData = await req.formData()
    const file = formData.get("file") as File
    const caseId = formData.get("caseId") as string | undefined

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Upload the file
    const { image, error: uploadError } = await uploadMedicalImage(file, requestId, patientId, caseId)

    if (uploadError || !image) {
      return NextResponse.json({ error: uploadError || "Failed to upload image" }, { status: 400 })
    }

    return NextResponse.json(
      {
        message: "Image uploaded successfully",
        image,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Image upload error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

