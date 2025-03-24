"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { FileUploader } from "@/components/provider/file-uploader"
import { CheckCircle, Upload, Shield, AlertTriangle } from "lucide-react"

export function SecureUploadInterface({
  patientName = "Jane Doe",
  requestId = "IMG-1234",
  imageType = "MRI",
  bodyPart = "Brain",
}) {
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [progress, setProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const handleUpload = () => {
    setUploadState("uploading")

    // Simulate upload progress
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15
      if (currentProgress > 100) {
        currentProgress = 100
        clearInterval(interval)
        setUploadState("success")
        setUploadedFiles(["brain_mri_1.dcm", "brain_mri_2.dcm", "brain_mri_3.dcm"])
      }
      setProgress(currentProgress)
    }, 500)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Secure Medical Image Upload</CardTitle>
              <CardDescription>Upload medical images directly to {patientName}'s MedSecOp account</CardDescription>
            </div>
            <Shield className="h-8 w-8 text-primary/70" />
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="bg-muted/50 rounded-lg p-4 border">
            <h3 className="font-medium mb-2">Request Details</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Patient:</span>
                <span className="ml-2 font-medium">{patientName}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Request ID:</span>
                <span className="ml-2 font-medium">{requestId}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Image Type:</span>
                <span className="ml-2 font-medium">{imageType}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Body Part:</span>
                <span className="ml-2 font-medium">{bodyPart}</span>
              </div>
            </div>
          </div>

          {uploadState === "success" ? (
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Upload Complete</h3>
              <p className="text-muted-foreground mb-4">
                The medical images have been securely uploaded to {patientName}'s MedSecOp account.
              </p>
              <div className="bg-white rounded border p-3 max-w-md mx-auto">
                <h4 className="font-medium text-sm mb-2">Uploaded Files:</h4>
                <ul className="text-sm text-left space-y-1">
                  {uploadedFiles.map((file, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                      {file}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <>
              {uploadState === "uploading" ? (
                <div className="space-y-4">
                  <h3 className="font-medium">Uploading Images</h3>
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-center text-muted-foreground">
                    Please don't close this window until the upload is complete.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="providerName">Healthcare Provider Name</Label>
                      <Input id="providerName" placeholder="Dr. Smith / Memorial Hospital Radiology" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="providerEmail">Your Email</Label>
                        <Input id="providerEmail" type="email" placeholder="provider@hospital.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="studyDate">Study Date</Label>
                        <Input id="studyDate" type="date" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="imageFormat">Image Format</Label>
                      <Select defaultValue="dicom">
                        <SelectTrigger id="imageFormat">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dicom">DICOM</SelectItem>
                          <SelectItem value="jpg">JPEG</SelectItem>
                          <SelectItem value="png">PNG</SelectItem>
                          <SelectItem value="pdf">PDF</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Upload Medical Images</Label>
                      <FileUploader />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes (Optional)</Label>
                      <Textarea id="notes" placeholder="Any relevant information about these images" />
                    </div>

                    <div className="flex items-start space-x-2 pt-2">
                      <Checkbox id="consent" required />
                      <div className="grid gap-1.5 leading-none">
                        <label htmlFor="consent" className="text-sm font-medium leading-none">
                          I confirm I have the right to share these images
                        </label>
                        <p className="text-sm text-muted-foreground">
                          I confirm that I am authorized to share these medical images with the patient and that patient
                          consent has been obtained.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </CardContent>
        {uploadState !== "success" && (
          <CardFooter className="flex justify-between">
            <div className="flex items-center text-amber-600 text-sm">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span>This link expires in 14 days</span>
            </div>
            {uploadState === "idle" && (
              <Button onClick={handleUpload} className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Images
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

