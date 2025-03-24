import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = process.env.MAILERSEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ status: "error", message: "MailerSend API key is not configured" }, { status: 500 })
    }

    // Check MailerSend API status
    const response = await fetch("https://api.mailersend.com/v1/domains", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { status: "error", message: "MailerSend API is not responding correctly" },
        { status: 503 },
      )
    }

    return NextResponse.json({
      status: "operational",
      message: "MailerSend service is operational",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error checking MailerSend status:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to check MailerSend status",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

