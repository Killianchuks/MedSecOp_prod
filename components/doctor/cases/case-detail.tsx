"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, FileText, Image, MessageSquare, Clock, CheckSquare } from "lucide-react"
import { DicomViewer } from "../dicom/dicom-viewer"
import { useToast } from "@/components/ui/use-toast"

// Define types for our case data
interface CaseData {
  id: string
  status: "pending" | "accepted" | "rejected" | "completed"
  specialty: string
  submittedDate: string
  urgency: "normal" | "expedited" | "urgent"
  description: string
  hasImages: boolean
  hasDocuments: boolean
}

export function CaseDetail({
  caseId,
  onStatusChange,
}: {
  caseId: string
  onStatusChange?: (caseId: string, newStatus: "pending" | "accepted" | "rejected" | "completed") => void
}) {
  // State for active tab
  const [activeSection, setActiveSection] = useState<"overview" | "documents" | "images" | "communication">("overview")
  const [viewingImage, setViewingImage] = useState<string | null>(null)
  const [caseData, setCaseData] = useState<CaseData>({
    id: caseId,
    status: "pending",
    specialty: "Cardiology",
    submittedDate: "2023-09-15",
    urgency: "expedited",
    description: "Request for second opinion on cardiac treatment plan. Patient has history of...",
    hasImages: true,
    hasDocuments: true,
  })
  const { toast } = useToast()

  // Function to update case status and notify admin
  const updateCaseStatus = (newStatus: "pending" | "accepted" | "rejected" | "completed") => {
    // Update local state
    setCaseData((prev) => ({ ...prev, status: newStatus }))

    // In a real app, this would be an API call
    console.log(`Case ${caseId} status updated to ${newStatus}`)

    // Notify admin (in a real app, this would be a server action or API call)
    notifyAdmin(newStatus)

    // Call the parent component's callback if provided
    if (onStatusChange) {
      onStatusChange(caseId, newStatus)
    }

    // Show toast notification
    toast({
      title: "Case Status Updated",
      description: `Case ${caseId} has been ${newStatus}.`,
    })
  }

  // Function to notify admin of status change
  const notifyAdmin = (status: string) => {
    // In a real app, this would be a server action or API call
    console.log(`Admin notification: Case ${caseId} status changed to ${status}`)

    // This would typically send a notification to the admin dashboard
    // For now, we'll just simulate this with a console log
  }

  // Function to handle case acceptance
  const handleAcceptCase = () => {
    updateCaseStatus("accepted")
  }

  // Function to handle case rejection
  const handleRejectCase = () => {
    updateCaseStatus("rejected")
  }

  // Function to handle case completion
  const handleCompleteCase = () => {
    updateCaseStatus("completed")
  }

  // Render the appropriate content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Case ID</p>
                <p className="font-medium">{caseData.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Specialty</p>
                <p className="font-medium">{caseData.specialty}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Submitted Date</p>
                <p className="font-medium">{caseData.submittedDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Urgency</p>
                <Badge
                  variant={
                    caseData.urgency === "urgent"
                      ? "destructive"
                      : caseData.urgency === "expedited"
                        ? "warning"
                        : "outline"
                  }
                >
                  {caseData.urgency.charAt(0).toUpperCase() + caseData.urgency.slice(1)}
                </Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p className="text-sm">{caseData.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              {caseData.hasDocuments && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  Documents Available
                </Badge>
              )}
              {caseData.hasImages && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Image className="h-3 w-3" />
                  Images Available
                </Badge>
              )}
            </div>
          </div>
        )
      case "documents":
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Medical records and documents related to this case.</p>
            <div className="grid gap-2">
              <div className="flex items-center p-2 border rounded-md">
                <FileText className="h-5 w-5 mr-2 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Medical History.pdf</p>
                  <p className="text-xs text-gray-500">Uploaded on {caseData.submittedDate}</p>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>
              <div className="flex items-center p-2 border rounded-md">
                <FileText className="h-5 w-5 mr-2 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Lab Results.pdf</p>
                  <p className="text-xs text-gray-500">Uploaded on {caseData.submittedDate}</p>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>
            </div>
          </div>
        )
      case "images":
        return (
          <div className="space-y-4">
            {viewingImage ? (
              <div className="space-y-4">
                <Button variant="outline" onClick={() => setViewingImage(null)}>
                  Back to Images
                </Button>
                <DicomViewer studyId={viewingImage} />
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500">Medical images related to this case.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-md p-2">
                    <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center mb-2">
                      <Image className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium">X-Ray Image</p>
                    <div className="flex mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1"
                        onClick={() => setViewingImage("STUDY-1003")}
                      >
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-md p-2">
                    <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center mb-2">
                      <Image className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium">MRI Scan</p>
                    <div className="flex mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1"
                        onClick={() => setViewingImage("STUDY-1001")}
                      >
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )
      case "communication":
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Communication history for this case.</p>
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium">System</p>
                  <p className="text-sm">Case submitted for review.</p>
                  <p className="text-xs text-gray-500 mt-1">{caseData.submittedDate}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium">System</p>
                  <p className="text-sm">Waiting for specialist assignment.</p>
                  <p className="text-xs text-gray-500 mt-1">{caseData.submittedDate}</p>
                </div>
              </div>
              {caseData.status !== "pending" && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium">System</p>
                    <p className="text-sm">
                      Case{" "}
                      {caseData.status === "accepted"
                        ? "accepted by specialist"
                        : caseData.status === "rejected"
                          ? "rejected by specialist"
                          : "completed by specialist"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Today</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">Case {caseId}</CardTitle>
            <CardDescription>
              {caseData.specialty} - {caseData.submittedDate}
            </CardDescription>
          </div>
          <Badge
            variant={
              caseData.status === "completed"
                ? "default"
                : caseData.status === "accepted"
                  ? "success"
                  : caseData.status === "rejected"
                    ? "destructive"
                    : "secondary"
            }
          >
            {caseData.status.charAt(0).toUpperCase() + caseData.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Custom tab navigation */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveSection("overview")}
            className={`px-4 py-2 font-medium text-sm ${
              activeSection === "overview"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSection("documents")}
            className={`px-4 py-2 font-medium text-sm ${
              activeSection === "documents"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Documents
          </button>
          <button
            onClick={() => setActiveSection("images")}
            className={`px-4 py-2 font-medium text-sm ${
              activeSection === "images"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Images
          </button>
          <button
            onClick={() => setActiveSection("communication")}
            className={`px-4 py-2 font-medium text-sm ${
              activeSection === "communication"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Communication
          </button>
        </div>

        {/* Content area */}
        <div className="min-h-[300px]">{renderContent()}</div>
      </CardContent>

      {caseData.status === "pending" && (
        <>
          <Separator />
          <CardFooter className="flex justify-between pt-6">
            <Button variant="outline" onClick={handleRejectCase} className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Reject Case
            </Button>
            <Button onClick={handleAcceptCase} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Accept Case
            </Button>
          </CardFooter>
        </>
      )}

      {caseData.status === "accepted" && (
        <>
          <Separator />
          <CardFooter className="flex justify-end pt-6">
            <Button onClick={handleCompleteCase} className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              Mark as Completed
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

