// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server"
import { hashPassword, supabaseAdmin } from "@/lib/db/db-client"  // Updated import path
// Import any other dependencies you need

export async function POST(req: NextRequest) {
  try {
    // Rest of your code...
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "An error occurred during registration" }, { status: 500 })
  }
}