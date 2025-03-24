import { type NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/lib/mail"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const { to, subject, html, text, templateId, variables, attachments, cc, bcc, replyTo } = body

    // Validate required fields
    if (!to || !subject) {
      return NextResponse.json({ error: "Missing required fields: to and subject are required" }, { status: 400 })
    }

    // Send email
    const result = await sendEmail({
      to,
      subject,
      html,
      text,
      templateId,
      variables,
      attachments,
      cc,
      bcc,
      replyTo,
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, messageId: result.messageId })
  } catch (error) {
    console.error("Error in mail/send API route:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}

