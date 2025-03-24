"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CaseDetail } from "./case-detail"

// Define types for our case data
interface Case {
  id: string
  status: "pending" | "accepted" | "rejected" | "completed"
  specialty: string
  submittedDate: string
  urgency: "normal" | "expedited" | "urgent"
}

export default function CaseList() {
  // State for selected case
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("all")
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")

  // Mock data - in a real app, this would come from an API
  const [cases, setCases] = useState<Case[]>([
    {
      id: "CASE-001",
      status: "pending",
      specialty: "Cardiology",
      submittedDate: "2023-09-15",
      urgency: "normal",
    },
    {
      id: "CASE-002",
      status: "accepted",
      specialty: "Neurology",
      submittedDate: "2023-09-14",
      urgency: "expedited",
    },
    {
      id: "CASE-003",
      status: "completed",
      specialty: "Oncology",
      submittedDate: "2023-09-10",
      urgency: "urgent",
    },
    {
      id: "CASE-004",
      status: "rejected",
      specialty: "Orthopedics",
      submittedDate: "2023-09-08",
      urgency: "normal",
    },
  ])

  // Function to handle case selection
  const handleCaseSelect = (caseId: string) => {
    setSelectedCaseId(caseId === selectedCaseId ? null : caseId)
  }

  // Function to handle case status change
  const handleCaseStatusChange = (caseId: string, newStatus: "pending" | "accepted" | "rejected" | "completed") => {
    setCases((prevCases) => prevCases.map((c) => (c.id === caseId ? { ...c, status: newStatus } : c)))
  }

  // Filter cases based on current filters
  const filteredCases = cases.filter((c) => {
    // Filter by status
    if (statusFilter !== "all" && c.status !== statusFilter) return false

    // Filter by specialty
    if (specialtyFilter !== "all" && c.specialty.toLowerCase() !== specialtyFilter) return false

    // Filter by urgency
    if (urgencyFilter !== "all" && c.urgency !== urgencyFilter) return false

    // Filter by search term
    if (
      searchTerm &&
      !c.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !c.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex-1">
          <Input
            placeholder="Search cases..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="oncology">Oncology</SelectItem>
              <SelectItem value="orthopedics">Orthopedics</SelectItem>
            </SelectContent>
          </Select>
          <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Urgencies</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="expedited">Expedited</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6">
        {filteredCases.length > 0 ? (
          <div className="grid gap-4">
            {filteredCases.map((caseItem) => (
              <Card key={caseItem.id} className={selectedCaseId === caseItem.id ? "border-primary" : ""}>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{caseItem.id}</CardTitle>
                      <CardDescription>
                        {caseItem.specialty} - {caseItem.submittedDate}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          caseItem.urgency === "urgent"
                            ? "destructive"
                            : caseItem.urgency === "expedited"
                              ? "warning"
                              : "outline"
                        }
                      >
                        {caseItem.urgency.charAt(0).toUpperCase() + caseItem.urgency.slice(1)}
                      </Badge>
                      <Badge
                        variant={
                          caseItem.status === "completed"
                            ? "default"
                            : caseItem.status === "accepted"
                              ? "success"
                              : caseItem.status === "rejected"
                                ? "destructive"
                                : "secondary"
                        }
                      >
                        {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => handleCaseSelect(caseItem.id)}>
                      {selectedCaseId === caseItem.id ? "Hide Details" : "View Details"}
                    </Button>
                  </div>

                  {selectedCaseId === caseItem.id && (
                    <div className="mt-4">
                      <CaseDetail caseId={caseItem.id} onStatusChange={handleCaseStatusChange} />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-muted-foreground">No cases found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

