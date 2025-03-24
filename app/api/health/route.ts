import { NextResponse } from "next/server"
import { checkDatabaseConnection } from "@/lib/db"

export async function GET() {
  try {
    // Simple health check - just verify Supabase connection
    const dbConnected = await checkDatabaseConnection()

    if (!dbConnected) {
      return NextResponse.json({ status: "error", message: "Database connection failed" }, { status: 503 })
    }

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Health check error:", error)
    return NextResponse.json({ status: "error", message: "Health check failed" }, { status: 500 })
  }
}

