"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Steps, Step } from "@/components/ui/steps"
import { Badge } from "@/components/ui/badge"
import { Hospital, ShieldCheck, ArrowRightLeft, Bell, CheckCircle2, Server, Lock, FileText } from "lucide-react"

export function ImageTransferWorkflow() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>How Image Transfer Works</CardTitle>
        <CardDescription>
          The secure process of transferring your medical images from healthcare facilities to MedSecOp
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <Steps className="pt-4">
          <Step>
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <Hospital className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Healthcare Facility Receives Request</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  When you submit a request, the healthcare facility receives a secure notification with your details
                  and the specific images requested.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    HL7 FHIR API
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Secure Email
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    PACS Integration
                  </Badge>
                </div>
              </div>
            </div>
          </Step>

          <Step>
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Identity Verification</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  The facility verifies your identity through secure authentication methods to ensure only authorized
                  patients receive medical data.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    OAuth 2.0
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Digital Consent
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    HIPAA Compliance
                  </Badge>
                </div>
              </div>
            </div>
          </Step>

          <Step>
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <ArrowRightLeft className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Secure Image Transfer</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  After verification, the facility's PACS system securely transfers your images to MedSecOp's medical
                  imaging storage.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    DICOM Transfer
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    End-to-End Encryption
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    DICOMweb
                  </Badge>
                </div>
              </div>
            </div>
          </Step>

          <Step>
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <Server className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Processing & Storage</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  MedSecOp processes the received DICOM files, optimizes them for viewing, and securely stores them in
                  your patient account.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    DICOM Processing
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Encrypted Storage
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Data Integrity
                  </Badge>
                </div>
              </div>
            </div>
          </Step>

          <Step>
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Patient Notification</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You receive an email and in-app notification when your images are available for viewing in your
                  MedSecOp account.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    Email Alert
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    SMS Notification
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    In-App Alert
                  </Badge>
                </div>
              </div>
            </div>
          </Step>

          <Step>
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Images Available in Dashboard</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your medical images are now available in your MedSecOp dashboard, where you can view, download, or
                  share them with your doctors.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    DICOM Viewer
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Download Options
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Secure Sharing
                  </Badge>
                </div>
              </div>
            </div>
          </Step>
        </Steps>

        <div className="mt-8 border rounded-md p-4 bg-muted/30">
          <div className="flex items-start gap-3">
            <div className="bg-amber-100 p-2 rounded-full mt-0.5">
              <Lock className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Security & Compliance</h4>
              <p className="text-sm text-muted-foreground mt-1">
                All image transfers comply with HIPAA, GDPR, and other healthcare data regulations. Images are encrypted
                during transfer and storage, and access is strictly controlled through secure authentication.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 mt-4">
            <div className="bg-blue-100 p-2 rounded-full mt-0.5">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Technical Standards</h4>
              <p className="text-sm text-muted-foreground mt-1">
                MedSecOp uses industry-standard protocols including DICOM, HL7 FHIR, and DICOMweb to ensure
                compatibility with all major healthcare imaging systems and PACS providers.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

