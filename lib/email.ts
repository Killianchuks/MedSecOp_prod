// Simple email utility for development
export async function sendVerificationEmail(email: string, token: string, role: string) {
  // In a real application, you would use a proper email service
  // For now, we'll just log the verification link
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const verificationLink = `${baseUrl}/api/auth/verify?token=${token}&email=${encodeURIComponent(email)}`

  console.log(`
    =============== VERIFICATION EMAIL ===============
    To: ${email}
    Subject: Verify your MedSecOp account
    
    Hello,
    
    Thank you for registering with MedSecOp as a ${role}.
    Please verify your email by clicking the link below:
    
    ${verificationLink}
    
    This link will expire in 24 hours.
    
    If you did not register for MedSecOp, please ignore this email.
    
    Best regards,
    The MedSecOp Team
    ===============================================
  `)

  // If MailerSend API key is available, use it to send the email
  if (process.env.MAILERSEND_API_KEY) {
    try {
      const templateId =
        role.toLowerCase() === "doctor"
          ? process.env.MAILERSEND_TEMPLATE_WELCOME_DOCTOR
          : process.env.MAILERSEND_TEMPLATE_WELCOME_PATIENT

      if (!templateId) {
        throw new Error("Email template ID not found")
      }

      const response = await fetch("https://api.mailersend.com/v1/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: {
            email: process.env.DEFAULT_FROM_EMAIL || "noreply@medsecop.com",
            name: process.env.DEFAULT_FROM_NAME || "MedSecOp",
          },
          to: [{ email }],
          template_id: templateId,
          variables: [
            {
              email,
              substitutions: [
                {
                  var: "verification_link",
                  value: verificationLink,
                },
              ],
            },
          ],
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`MailerSend API error: ${JSON.stringify(errorData)}`)
      }

      console.log("Verification email sent successfully via MailerSend")
    } catch (error) {
      console.error("Failed to send email via MailerSend:", error)
      // Fall back to console log
    }
  }

  // Return true to indicate success (even if we just logged it)
  return true
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const resetLink = `${baseUrl}/auth/reset-password?token=${token}&email=${encodeURIComponent(email)}`

  console.log(`
    =============== PASSWORD RESET EMAIL ===============
    To: ${email}
    Subject: Reset your MedSecOp password
    
    Hello,
    
    You requested to reset your MedSecOp password.
    Please click the link below to set a new password:
    
    ${resetLink}
    
    This link will expire in 1 hour.
    
    If you did not request a password reset, please ignore this email.
    
    Best regards,
    The MedSecOp Team
    ===============================================
  `)

  // If MailerSend API key is available, use it to send the email
  if (process.env.MAILERSEND_API_KEY && process.env.MAILERSEND_TEMPLATE_PASSWORD_RESET) {
    try {
      const response = await fetch("https://api.mailersend.com/v1/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: {
            email: process.env.DEFAULT_FROM_EMAIL || "noreply@medsecop.com",
            name: process.env.DEFAULT_FROM_NAME || "MedSecOp",
          },
          to: [{ email }],
          template_id: process.env.MAILERSEND_TEMPLATE_PASSWORD_RESET,
          variables: [
            {
              email,
              substitutions: [
                {
                  var: "reset_link",
                  value: resetLink,
                },
              ],
            },
          ],
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`MailerSend API error: ${JSON.stringify(errorData)}`)
      }

      console.log("Password reset email sent successfully via MailerSend")
    } catch (error) {
      console.error("Failed to send password reset email via MailerSend:", error)
      // Fall back to console log
    }
  }

  // Return true to indicate success (even if we just logged it)
  return true
}

