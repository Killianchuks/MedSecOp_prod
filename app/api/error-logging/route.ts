import { type NextRequest, NextResponse } from "next/server"
import { logError, LogSeverity } from "@/lib/error-handler"

// API route for client-side error logging
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate request body
    if (!body.message) {
      return NextResponse.json({ error: "Error message is required" }, { status: 400 })
    }

    // Extract error details
    const { message, stack, severity = LogSeverity.ERROR, context = {}, source = "client" } = body

    // Add request information to context
    const enhancedContext = {
      ...context,
      userAgent: req.headers.get("user-agent") || "unknown",
      referer: req.headers.get("referer") || "unknown",
      ip: req.headers.get("x-forwarded-for") || req.ip || "unknown",
      source,
    }

    // Log the error
    await logError({ message, stack }, severity as LogSeverity, enhancedContext)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error logging API error:", error)
    return NextResponse.json({ error: "Failed to log error" }, { status: 500 })
  }
}

