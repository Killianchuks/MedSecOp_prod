import { type NextRequest, NextResponse } from "next/server"
import { rawQuery } from "@/lib/db"
import { handleApiError, ErrorCode } from "@/lib/error-handler"

// Handle analytics events
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()

    // Validate request body
    if (!body.events || !Array.isArray(body.events) || body.events.length === 0) {
      return NextResponse.json({ error: "Invalid request body. 'events' array is required." }, { status: 400 })
    }

    // In a production environment, we would store these events in a database
    // or send them to an analytics service

    if (process.env.NODE_ENV === "production") {
      // Store events in database
      const values = body.events.map((event: any) => [
        event.category,
        event.action,
        event.label || null,
        event.value || null,
        JSON.stringify(event.properties || {}),
        new Date(event.timestamp).toISOString(),
        body.user?.userId || null,
        body.user?.role || null,
        body.user?.region || null,
      ])

      // Batch insert events
      const placeholders = values
        .map(
          (_: any, i: number) =>
            `($${i * 9 + 1}, $${i * 9 + 2}, $${i * 9 + 3}, $${i * 9 + 4}, $${i * 9 + 5}, $${i * 9 + 6}, $${i * 9 + 7}, $${i * 9 + 8}, $${i * 9 + 9})`,
        )
        .join(", ")

      const flatValues = values.flat();

      await rawQuery(
        `
        INSERT INTO analytics_events 
        (category, action, label, value, properties, timestamp, user_id, user_role, user_region)
        VALUES ${placeholders}
      `,
        flatValues,
      )
    } else {
      // In development, just log to console
      console.log("Analytics events received:", body.events.length)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    const errorResponse = await handleApiError(error, "Failed to process analytics events")
    return NextResponse.json(errorResponse, { status: getStatusCodeForError(errorResponse.code) })
  }
}

// Helper function to get status code
function getStatusCodeForError(code: ErrorCode): number {
  if (code.startsWith("auth/")) {
    return code === ErrorCode.UNAUTHORIZED ? 401 : 403
  }

  if (code === ErrorCode.NOT_FOUND) {
    return 404
  }

  if (code.startsWith("validation/")) {
    return 400
  }

  // Default to internal server error
  return 500
}

