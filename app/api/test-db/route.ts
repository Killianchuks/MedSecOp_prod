import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // Test the database connection
    const result = await sql`SELECT 1 as connection_test`

    // Check if tables exist
    const tablesResult = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `

    const tables = tablesResult.rows.map((row) => row.table_name)

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      connectionTest: result.rows[0],
      tables,
      databaseUrl: process.env.DATABASE_URL
        ? process.env.DATABASE_URL.replace(/\/\/(.+?):(.+?)@/, "//[USERNAME]:[PASSWORD]@")
        : "Not configured",
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      {
        error: "Database connection failed",
        details: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}

