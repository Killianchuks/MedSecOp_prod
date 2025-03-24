"use client"

import { useEffect, useState } from "react"
import { SecureUploadInterface } from "@/components/provider/secure-upload-interface"
import { AlertCircle } from "lucide-react"

export default function ProviderUploadPage({ params }: { params: { token: string } }) {
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // In a real implementation, this would validate the token against the database
  useEffect(() => {
    const validateToken = async () => {
      // Simulate API call to validate token
      setTimeout(() => {
        // For demo purposes, we'll consider tokens that start with "IMG-" as valid
        const valid = params.token.includes("IMG-")
        setIsValidToken(valid)
        setIsLoading(false)
      }, 1000)
    }

    validateToken()
  }, [params.token])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Validating secure upload link...</p>
        </div>
      </div>
    )
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="rounded-full bg-red-100 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Invalid or Expired Link</h1>
          <p className="text-muted-foreground mb-6">
            This secure upload link is invalid or has expired. Please contact the patient to request a new link.
          </p>
        </div>
      </div>
    )
  }

  return <SecureUploadInterface />
}

