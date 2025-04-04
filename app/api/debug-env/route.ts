import { validateEnv } from "@/lib/validateEnv"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    validateEnv()
    return NextResponse.json({ status: "ok", message: "All env variables loaded!" })
  } catch (error: any) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 })
  }
}
