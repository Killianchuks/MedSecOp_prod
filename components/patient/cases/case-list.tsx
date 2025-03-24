"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, Clock, AlertCircle, CheckCircle, Download, MessageSquare } from "lucide-react"

// Sample case data
const cases = [
  {
    id: "CASE-1234",
    title: "Atrial Fibrillation Consultation",
    specialty: "Cardiology",
    condition: "Atrial Fibrillation",
    status: "In Progress",
    date: "Mar 15, 2025",
    dueDate: "Mar 18, 2025",
    doctor: {
      name: "Dr. Jane Smith",
      initials: "JS",
      specialty: "Cardiologist",
    },
    description:
      "Seeking a second opinion on my atrial fibrillation diagnosis and treatment options. Current medication includes beta blockers, but I'm experiencing side effects.",
    documents: [
      { name: "ECG Results", type: "PDF", size: "1.2 MB" },
      { name: "Medical History", type: "PDF", size: "3.1 MB" },
      { name: "Current Medications", type: "PDF", size: "0.8 MB" },
    ],
  },
  {
    id: "CASE-1233",
    title: "Chronic Migraine Treatment Review",
    specialty: "Neurology",
    condition: "Chronic Migraine",
    status: "Unassigned",
    date: "Mar 14, 2025",
    dueDate: "Pending Assignment",
    doctor: null,
    description:
      "Experiencing severe migraines 3-4 times per week despite current preventive medication. Looking for alternative treatment options and possible causes.",
    documents: [
      { name: "Headache Diary", type: "PDF", size: "2.5 MB" },
      { name: "MRI Results", type: "PDF", size: "4.7 MB" },
      { name: "Previous Treatments", type: "PDF", size: "1.3 MB" },
    ],
  },
  {
    id: "CASE-1232",
    title: "Lower Back Pain Evaluation",
    specialty: "Orthopedics",
    condition: "Lumbar Disc Herniation",
    status: "In Progress",
    date: "Mar 12, 2025",
    dueDate: "Mar 16, 2025",
    doctor: {
      name: "Dr. Michael Chen",
      initials: "MC",
      specialty: "Orthopedic Surgeon",
    },
    description:
      "Experiencing severe lower back pain with radiation down left leg. MRI shows L4-L5 disc herniation. Seeking opinion on whether surgery is necessary or if conservative treatment is viable.",
    documents: [
      { name: "MRI Report", type: "PDF", size: "3.2 MB" },
      { name: "X-Ray Images", type: "PDF", size: "2.8 MB" },
      { name: "Physical Therapy Notes", type: "PDF", size: "1.5 MB" },
    ],
  },
  {
    id: "CASE-1231",
    title: "Skin Lesion Assessment",
    specialty: "Dermatology",
    condition: "Suspicious Mole",
    status: "Completed",
    date: "Mar 10, 2025",
    completedDate: "Mar 13, 2025",
    doctor: {
      name: "Dr. Emily Davis",
      initials: "ED",
      specialty: "Dermatologist",
    },
    opinion:
      "Based on the images and description provided, the lesion appears to be a benign compound nevus (mole). The regular borders, consistent coloration, and lack of recent changes are reassuring features. However, I recommend a simple excisional biopsy to confirm the diagnosis, especially given the family history of melanoma. This is a routine procedure that can be performed in an outpatient setting with minimal recovery time.",
    recommendation: "Excisional biopsy recommended as a precautionary measure.",
    documents: [
      { name: "Dermatology Photos", type: "PDF", size: "5.7 MB" },
      { name: "Family History", type: "PDF", size: "1.1 MB" },
      { name: "Second Opinion Report", type: "PDF", size: "2.3 MB" },
    ],
  },
  {
    id: "CASE-1230",
    title: "Thyroid Nodule Evaluation",
    specialty: "Endocrinology",
    condition: "Thyroid Nodule",
    status: "Completed",
    date: "Mar 5, 2025",
    completedDate: "Mar 9, 2025",
    doctor: {
      name: "Dr. Robert Wilson",
      initials: "RW",
      specialty: "Endocrinologist",
    },
    opinion:
      "After reviewing your ultrasound results and thyroid function tests, I concur that the 1.2cm nodule is likely benign based on its sonographic features. The normal thyroid function tests are also reassuring. However, given the size and the presence of microcalcifications, I recommend a fine needle aspiration (FNA) biopsy to definitively rule out malignancy. This is a standard approach for nodules of this size and characteristics.",
    recommendation: "Fine needle aspiration biopsy recommended to confirm benign nature.",
    documents: [
      { name: "Thyroid Ultrasound", type: "PDF", size: "3.8 MB" },
      { name: "Lab Results", type: "PDF", size: "1.4 MB" },
      { name: "Second Opinion Report", type: "PDF", size: "2.1 MB" },
    ],
  },
]

export function CaseList() {
  const [selectedCase, setSelectedCase] = useState<(typeof cases)[0] | null>(null)

  const getCasesByTab = (tab: string) => {
    return cases.filter((c) => {
      if (tab === "active") return c.status === "In Progress"
      if (tab === "unassigned") return c.status === "Unassigned"
      if (tab === "completed") return c.status === "Completed"
      return true
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-12">
      <Card className="md:col-span-5 lg:col-span-4">
        <CardHeader>
          <CardTitle>My Cases</CardTitle>
          <CardDescription>View and track your second opinion requests</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 mx-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            {["all", "active", "unassigned", "completed"].map((tab) => (
              <TabsContent key={tab} value={tab} className="p-0">
                <div className="divide-y">
                  {getCasesByTab(tab).length > 0 ? (
                    getCasesByTab(tab).map((caseItem) => (
                      <div
                        key={caseItem.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedCase?.id === caseItem.id ? "bg-gray-50" : ""}`}
                        onClick={() => setSelectedCase(caseItem)}
                      >
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{caseItem.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{caseItem.id}</span>
                              <span>•</span>
                              <span>{caseItem.specialty}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <Badge
                              variant={
                                caseItem.status === "Completed"
                                  ? "outline"
                                  : caseItem.status === "In Progress"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {caseItem.status}
                            </Badge>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>
                                {caseItem.status === "Completed"
                                  ? `Completed: ${caseItem.completedDate}`
                                  : caseItem.status === "Unassigned"
                                    ? "Awaiting assignment"
                                    : `Due: ${caseItem.dueDate}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      <div className="mb-2">
                        {tab === "active" ? (
                          <Clock className="h-8 w-8 mx-auto text-muted-foreground/60" />
                        ) : tab === "unassigned" ? (
                          <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground/60" />
                        ) : tab === "completed" ? (
                          <CheckCircle className="h-8 w-8 mx-auto text-muted-foreground/60" />
                        ) : (
                          <FileText className="h-8 w-8 mx-auto text-muted-foreground/60" />
                        )}
                      </div>
                      <p>No {tab} cases at the moment.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card className="md:col-span-7 lg:col-span-8">
        {selectedCase ? (
          <>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>{selectedCase.title}</CardTitle>
                <CardDescription className="mt-1">
                  {selectedCase.id} • {selectedCase.specialty} • {selectedCase.condition}
                </CardDescription>
              </div>
              <Badge
                variant={
                  selectedCase.status === "Completed"
                    ? "outline"
                    : selectedCase.status === "In Progress"
                      ? "default"
                      : "secondary"
                }
                className="text-xs py-1 px-3"
              >
                {selectedCase.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-2">Case Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Submitted</p>
                      <p className="text-sm font-medium">{selectedCase.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {selectedCase.status === "Completed" ? "Completed" : "Expected Completion"}
                      </p>
                      <p className="text-sm font-medium">
                        {selectedCase.status === "Completed"
                          ? selectedCase.completedDate
                          : selectedCase.status === "Unassigned"
                            ? "Pending Assignment"
                            : selectedCase.dueDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedCase.doctor && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Assigned Specialist</h3>
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                    <Avatar>
                      <AvatarFallback>{selectedCase.doctor.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedCase.doctor.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedCase.doctor.specialty}</p>
                    </div>
                    {selectedCase.status === "In Progress" && (
                      <Button variant="outline" size="sm" className="ml-auto">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold mb-2">Case Description</h3>
                <p className="text-sm bg-gray-50 p-4 rounded-lg">{selectedCase.description}</p>
              </div>

              {selectedCase.status === "Completed" && selectedCase.opinion && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Specialist Opinion</h3>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm">{selectedCase.opinion}</p>
                    {selectedCase.recommendation && (
                      <div className="mt-3 p-3 bg-primary/10 rounded-lg">
                        <p className="text-sm font-medium">Recommendation:</p>
                        <p className="text-sm">{selectedCase.recommendation}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold mb-2">Documents</h3>
                <div className="space-y-2">
                  {selectedCase.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between border p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {doc.type} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {selectedCase.status === "Unassigned" && (
                <div className="pt-4 flex gap-3">
                  <Button className="flex-1">Request Urgent Review</Button>
                  <Button variant="outline" className="flex-1">
                    Cancel Request
                  </Button>
                </div>
              )}

              {selectedCase.status === "Completed" && (
                <div className="pt-4 flex gap-3">
                  <Button className="flex-1">Download Full Report</Button>
                  <Button variant="outline" className="flex-1">
                    Request Follow-up
                  </Button>
                </div>
              )}
            </CardContent>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] text-center p-6">
            <FileText className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium">Select a case</h3>
            <p className="text-muted-foreground max-w-xs mt-1">
              Click on a case from the list to view details and specialist opinions
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}

