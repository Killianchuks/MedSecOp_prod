"use server"

import { MailerSend, EmailParams, Recipient, Sender } from "mailersend"

interface EmailOptions {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  templateId?: string
  variables?: Record<string, any>
  attachments?: Array<{
    filename: string
    content: Buffer | string
    contentDisposition?: string
  }>
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

    const mailerSend = new MailerSend({ apiKey })

    const recipients = Array.isArray(options.to)
      ? options.to.map((email) => new Recipient(email))
      : [new Recipient(options.to)]

    const emailParams = new EmailParams()
      .setFrom(new Sender(fromEmail, fromName))
      .setTo(recipients)
      .setSubject(options.subject)

    // Add CC if provided
    if (options.cc) {
      const ccRecipients = Array.isArray(options.cc)
        ? options.cc.map((email) => new Recipient(email))
        : [new Recipient(options.cc)]
      emailParams.setCc(ccRecipients)
    }

    // Add BCC if provided
    if (options.bcc) {
      const bccRecipients = Array.isArray(options.bcc)
        ? options.bcc.map((email) => new Recipient(email))
        : [new Recipient(options.bcc)]
      emailParams.setBcc(bccRecipients)
    }

    // Add reply-to if provided
    if (options.replyTo) {
      emailParams.setReplyTo(new Recipient(options.replyTo))
    }

    // Use template if provided, otherwise use HTML/text content
    if (options.templateId) {
      emailParams.setTemplateId(options.templateId)

      if (options.variables) {
        const personalization = []

        for (const recipient of recipients) {
          const substitutions = Object.entries(options.variables).map(([key, value]) => ({
            var: key,
            value: value?.toString() || "",
          }))

          personalization.push({
            email: recipient.email,
            data: options.variables,
            substitutions,
          })
        }

        emailParams.setPersonalization(personalization)
      }
    } else {
      // Use HTML or text content
      if (options.html) {
        emailParams.setHtml(options.html)
      }
      if (options.text) {
        emailParams.setText(options.text)
      }
    }

    // Add attachments if provided
    if (options.attachments && options.attachments.length > 0) {
      const attachments = options.attachments.map((attachment) => {
        const content =
          typeof attachment.content === "string" ? attachment.content : attachment.content.toString("base64")

        return {
          filename: attachment.filename,
          content,
          disposition: attachment.contentDisposition || "attachment",
        }
      })

      emailParams.setAttachments(attachments)
    }

    // Send the email
    const response = await mailerSend.email.send(emailParams)

    return {
      success: true,
      messageId: response.header?.["x-message-id"] || undefined,
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

    // Make a simple API call to check if the service is available
    // We'll use the getDomainList method which should be available
    await mailerSend.email.send(
      new EmailParams()
        .setFrom(new Sender("test@example.com", "Test"))
        .setTo([new Recipient("no-reply@example.com")])
        .setSubject("API Test")
        .setText("This is a test to check if the API is available.")
        .setHtml("<p>This is a test to check if the API is available.</p>"),
    )

    return {
      available: true,
      message: "MailerSend service is available",
    }
  } catch (error) {
    console.error("MailerSend service check failed:", error)

    // Check if it's an authentication error (which means the API is available but credentials are wrong)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const isAuthError = errorMessage.includes("authentication") || errorMessage.includes("unauthorized")

    return {
      available: isAuthError, // If it's an auth error, the service is technically available
      message: errorMessage,
    }
  }
}

