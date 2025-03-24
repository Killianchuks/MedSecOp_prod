"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Copy, CheckCircle, LinkIcon, Mail, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface SecureLinkGeneratorProps {
  requestId: string
  facilityName: string
  imageType: string
  bodyPart: string
}

export function SecureLinkGenerator({ requestId, facilityName, imageType, bodyPart }: SecureLinkGeneratorProps) {
  const [copied, setCopied] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [regenerating, setRegenerating] = useState(false)
  const { toast } = useToast()

  // Generate a secure-looking link (in a real implementation, this would be a unique, cryptographically secure token)
  const secureToken = `${requestId}-${Math.random().toString(36).substring(2, 10)}-${Date.now().toString(36)}`
  const secureUploadLink = `https://medsecop.com/provider/upload/${secureToken}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(secureUploadLink)
    setCopied(true)
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this secure link with your healthcare provider.",
    })
    setTimeout(() => setCopied(false), 3000)
  }

  const sendEmailToProvider = () => {
    setEmailSent(true)
    toast({
      title: "Email sent to provider",
      description: `A secure upload link has been sent to ${facilityName}.`,
    })
    setTimeout(() => setEmailSent(false), 3000)
  }

  const regenerateLink = () => {
    setRegenerating(true)
    toast({
      title: "Generating new secure link",
      description: "The previous link will no longer be valid.",
    })
    setTimeout(() => setRegenerating(false), 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LinkIcon className="h-5 w-5 text-primary" />
          Secure Upload Link
        </CardTitle>
        <CardDescription>
          Share this secure link with your healthcare provider to allow them to directly upload your medical images
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="secureLink">Secure Upload Link for {facilityName}</Label>
            <Badge variant="outline" className="font-normal">
              Expires in 14 days
            </Badge>
          </div>
          <div className="flex gap-2">
            <Input id="secureLink" value={secureUploadLink} readOnly className="font-mono text-sm" />
            <Button variant="outline" size="icon" onClick={copyToClipboard} className="shrink-0">
              {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            This link is unique to your request for {imageType} images of your {bodyPart}.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customMessage">Add a message (optional)</Label>
          <Textarea
            id="customMessage"
            placeholder="Please upload my recent MRI images using this secure link. Thank you!"
            rows={3}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" className="w-full sm:w-auto" onClick={regenerateLink} disabled={regenerating}>
          {regenerating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Regenerating...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate Link
            </>
          )}
        </Button>
        <Button className="w-full sm:w-auto" onClick={sendEmailToProvider} disabled={emailSent}>
          {emailSent ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Email Sent
            </>
          ) : (
            <>
              <Mail className="h-4 w-4 mr-2" />
              Email to Provider
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

