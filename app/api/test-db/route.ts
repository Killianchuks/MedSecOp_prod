import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

// Define types for your SQL results
interface SqlRow {
  [key: string]: any
}

interface SqlResult {
  rows: SqlRow[]
}

export async function GET(request: NextRequest) {
  try {
    // Test the database connection
    const result = (await sql`SELECT 1 as connection_test`) as SqlResult

    // Check if tables exist
    const tablesResult = (await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `) as SqlResult

    const tables = tablesResult.rows.map((row: SqlRow) => row.table_name)

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      connectionTest: result.rows[0],
      tables,
      databaseUrl: process.env.DATABASE_URL
        ? process.env.DATABASE_URL.replace(/\/\/(.+?):(.+?)@/, "//[USERNAME]:[PASSWORD]@")
        : "Not configured",
    })
  } catch (error: unknown) {
    console.error("Database connection error:", error)

    // Type guard to safely access error properties
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const errorStack = error instanceof Error ? error.stack : undefined

    return NextResponse.json(
      {
        error: "Database connection failed",
        details: errorMessage,
        stack: process.env.NODE_ENV === "development" ? errorStack : undefined,
      },
      { status: 500 },
    )
  }
}

