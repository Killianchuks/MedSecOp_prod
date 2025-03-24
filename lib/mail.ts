"use server"

import type { Attachment } from "nodemailer/lib/mailer"
import { MailerSend } from "mailersend"

interface EmailOptions {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  templateId?: string
  variables?: Record<string, any>
  attachments?: Attachment[]
  cc?: string | string[]
  bcc?: string | string[]
  replyTo?: string
}

interface MailerSendResponse {
  success: boolean
  messageId?: string
  error?: string
}

// Send email using MailerSend
export async function sendEmail(options: EmailOptions): Promise<MailerSendResponse> {
  try {
    const apiKey = process.env.MAILERSEND_API_KEY
    if (!apiKey) {
      throw new Error("MAILERSEND_API_KEY is not defined")
    }

    const fromEmail = process.env.DEFAULT_FROM_EMAIL || "noreply@medsecop.com"
    const fromName = process.env.DEFAULT_FROM_NAME || "MedSecOp"

    const recipients = Array.isArray(options.to) ? options.to.map((email) => ({ email })) : [{ email: options.to }]

    const payload: any = {
      from: {
        email: fromEmail,
        name: fromName,
      },
      to: recipients,
      subject: options.subject,
    }

    // Add CC if provided
    if (options.cc) {
      payload.cc = Array.isArray(options.cc) ? options.cc.map((email) => ({ email })) : [{ email: options.cc }]
    }

    // Add BCC if provided
    if (options.bcc) {
      payload.bcc = Array.isArray(options.bcc) ? options.bcc.map((email) => ({ email })) : [{ email: options.bcc }]
    }

    // Add reply-to if provided
    if (options.replyTo) {
      payload.reply_to = { email: options.replyTo }
    }

    // Use template if provided, otherwise use HTML/text content
    if (options.templateId) {
      payload.template_id = options.templateId
      if (options.variables) {
        payload.variables = [
          {
            email: Array.isArray(options.to) ? options.to[0] : options.to,
            substitutions: Object.entries(options.variables).map(([key, value]) => ({
              var: key,
              value: value?.toString() || "",
            })),
          },
        ]
      }
    } else {
      // Use HTML or text content
      if (options.html) {
        payload.html = options.html
      }
      if (options.text) {
        payload.text = options.text
      }
    }

    // Add attachments if provided
    if (options.attachments && options.attachments.length > 0) {
      payload.attachments = options.attachments.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content.toString("base64"),
        disposition: attachment.contentDisposition || "attachment",
      }))
    }

    // Send the email using MailerSend API
    const response = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("MailerSend API error:", data)
      return {
        success: false,
        error: data.message || "Failed to send email",
      }
    }

    return {
      success: true,
      messageId: data.message_id,
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Helper functions for common email types

export async function sendWelcomeEmail(
  to: string,
  name: string,
  role: "patient" | "doctor",
): Promise<MailerSendResponse> {
  const templateId =
    role === "patient"
      ? process.env.MAILERSEND_TEMPLATE_WELCOME_PATIENT
      : process.env.MAILERSEND_TEMPLATE_WELCOME_DOCTOR

  if (!templateId) {
    throw new Error(`Welcome email template for ${role} is not defined`)
  }

  return sendEmail({
    to,
    subject: "Welcome to MedSecOp",
    templateId,
    variables: {
      name,
      login_url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/login`,
      dashboard_url: `${process.env.NEXT_PUBLIC_APP_URL}/${role}/dashboard`,
    },
  })
}

export async function sendPasswordResetEmail(to: string, resetToken: string): Promise<MailerSendResponse> {
  const templateId = process.env.MAILERSEND_TEMPLATE_PASSWORD_RESET

  if (!templateId) {
    throw new Error("Password reset email template is not defined")
  }

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`

  return sendEmail({
    to,
    subject: "Reset Your MedSecOp Password",
    templateId,
    variables: {
      reset_url: resetUrl,
      expiry_time: "24 hours",
    },
  })
}

export async function sendCaseSubmittedEmail(
  to: string,
  caseName: string,
  caseId: string,
): Promise<MailerSendResponse> {
  const templateId = process.env.MAILERSEND_TEMPLATE_CASE_SUBMITTED

  if (!templateId) {
    throw new Error("Case submitted email template is not defined")
  }

  const caseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/patient/cases/${caseId}`

  return sendEmail({
    to,
    subject: "Your Medical Case Has Been Submitted",
    templateId,
    variables: {
      case_name: caseName,
      case_url: caseUrl,
      case_id: caseId,
    },
  })
}

export async function sendCaseAssignedEmail(
  to: string,
  doctorName: string,
  caseName: string,
  caseId: string,
): Promise<MailerSendResponse> {
  const templateId = process.env.MAILERSEND_TEMPLATE_CASE_ASSIGNED

  if (!templateId) {
    throw new Error("Case assigned email template is not defined")
  }

  const caseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/patient/cases/${caseId}`

  return sendEmail({
    to,
    subject: "Your Case Has Been Assigned to a Specialist",
    templateId,
    variables: {
      doctor_name: doctorName,
      case_name: caseName,
      case_url: caseUrl,
      case_id: caseId,
    },
  })
}

export async function sendCaseCompletedEmail(
  to: string,
  caseName: string,
  caseId: string,
): Promise<MailerSendResponse> {
  const templateId = process.env.MAILERSEND_TEMPLATE_CASE_COMPLETED

  if (!templateId) {
    throw new Error("Case completed email template is not defined")
  }

  const caseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/patient/cases/${caseId}`

  return sendEmail({
    to,
    subject: "Your Medical Second Opinion is Ready",
    templateId,
    variables: {
      case_name: caseName,
      case_url: caseUrl,
      case_id: caseId,
    },
  })
}

export async function sendPaymentConfirmationEmail(
  to: string,
  amount: number,
  caseName: string,
  caseId: string,
): Promise<MailerSendResponse> {
  const templateId = process.env.MAILERSEND_TEMPLATE_PAYMENT_CONFIRMATION

  if (!templateId) {
    throw new Error("Payment confirmation email template is not defined")
  }

  const caseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/patient/cases/${caseId}`
  const receiptUrl = `${process.env.NEXT_PUBLIC_APP_URL}/patient/billing`

  return sendEmail({
    to,
    subject: "Payment Confirmation - MedSecOp",
    templateId,
    variables: {
      amount: `$${amount.toFixed(2)}`,
      case_name: caseName,
      case_url: caseUrl,
      receipt_url: receiptUrl,
      payment_date: new Date().toLocaleDateString(),
    },
  })
}

export async function sendImageRequestEmail(
  to: string,
  patientName: string,
  uploadToken: string,
): Promise<MailerSendResponse> {
  const templateId = process.env.MAILERSEND_TEMPLATE_IMAGE_REQUEST

  if (!templateId) {
    throw new Error("Image request email template is not defined")
  }

  const uploadUrl = `${process.env.NEXT_PUBLIC_APP_URL}/provider/upload/${uploadToken}`

  return sendEmail({
    to,
    subject: "Medical Image Upload Request - MedSecOp",
    templateId,
    variables: {
      patient_name: patientName,
      upload_url: uploadUrl,
      expiry_time: "7 days",
    },
  })
}

/**
 * Check if the MailerSend service is available
 */
export async function checkMailerSendStatus(): Promise<{ available: boolean; message: string }> {
  try {
    const mailerSend = new MailerSend({ apiKey: process.env.MAILERSEND_API_KEY || "" })

    // Try to get account information as a simple API test
    await mailerSend.email.getDomains()

    return {
      available: true,
      message: "MailerSend service is available",
    }
  } catch (error) {
    console.error("MailerSend service check failed:", error)
    return {
      available: false,
      message: error instanceof Error ? error.message : "Unknown error checking MailerSend service",
    }
  }
}

