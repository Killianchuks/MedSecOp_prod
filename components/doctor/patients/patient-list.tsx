"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Search, FileText, Calendar, Phone, Mail, ChevronRight, Users } from "lucide-react"

// Sample patient data
const patients = [
  {
    id: "P-1001",
    name: "Sarah Johnson",
    initials: "SJ",
    age: 38,
    gender: "Female",
    email: "sarah.j@example.com",
    phone: "+1 (555) 123-4567",
    lastConsult: "Mar 15, 2025",
    totalCases: 2,
    activeCases: 1,
    cases: [
      {
        id: "CASE-1234",
        condition: "Atrial Fibrillation",
        status: "In Progress",
        date: "Mar 15, 2025",
      },
      {
        id: "CASE-1112",
        condition: "Hypertension",
        status: "Completed",
        date: "Jan 10, 2025",
      },
    ],
  },
  {
    id: "P-1002",
    name: "Michael Brown",
    initials: "MB",
    age: 62,
    gender: "Male",
    email: "m.brown@example.com",
    phone: "+1 (555) 234-5678",
    lastConsult: "Mar 12, 2025",
    totalCases: 1,
    activeCases: 0,
    cases: [
      {
        id: "CASE-1233",
        condition: "Prostate Cancer",
        status: "Completed",
        date: "Mar 12, 2025",
      },
    ],
  },
  {
    id: "P-1003",
    name: "David Wilson",
    initials: "DW",
    age: 45,
    gender: "Male",
    email: "d.wilson@example.com",
    phone: "+1 (555) 345-6789",
    lastConsult: "Mar 10, 2025",
    totalCases: 1,
    activeCases: 1,
    cases: [
      {
        id: "CASE-1232",
        condition: "Chronic Migraine",
        status: "In Progress",
        date: "Mar 10, 2025",
      },
    ],
  },
  {
    id: "P-1004",
    name: "Emily Davis",
    initials: "ED",
    age: 50,
    gender: "Female",
    email: "e.davis@example.com",
    phone: "+1 (555) 456-7890",
    lastConsult: "Mar 8, 2025",
    totalCases: 1,
    activeCases: 0,
    cases: [
      {
        id: "CASE-1231",
        condition: "Rotator Cuff Tear",
        status: "Completed",
        date: "Mar 8, 2025",
      },
    ],
  },
  {
    id: "P-1005",
    name: "Robert Miller",
    initials: "RM",
    age: 55,
    gender: "Male",
    email: "r.miller@example.com",
    phone: "+1 (555) 567-8901",
    lastConsult: "Mar 5, 2025",
    totalCases: 1,
    activeCases: 0,
    cases: [
      {
        id: "CASE-1230",
        condition: "Crohn's Disease",
        status: "Completed",
        date: "Mar 5, 2025",
      },
    ],
  },
  {
    id: "P-1006",
    name: "Jennifer Adams",
    initials: "JA",
    age: 42,
    gender: "Female",
    email: "j.adams@example.com",
    phone: "+1 (555) 678-9012",
    lastConsult: "Mar 16, 2025",
    totalCases: 1,
    activeCases: 1,
    cases: [
      {
        id: "CASE-1240",
        condition: "Mitral Valve Prolapse",
        status: "Available",
        date: "Mar 16, 2025",
      },
    ],
  },
]

export function PatientList() {
  const [selectedPatient, setSelectedPatient] = useState<(typeof patients)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="grid gap-6 md:grid-cols-12">
      <Card className="md:col-span-12 lg:col-span-8">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>My Patients</CardTitle>
              <CardDescription>View and manage your patient relationships</CardDescription>
            </div>
            <div className="w-full sm:w-auto max-w-sm relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Last Consultation</TableHead>
                  <TableHead className="text-center">Cases</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <TableRow
                      key={patient.id}
                      className={`cursor-pointer ${selectedPatient?.id === patient.id ? "bg-gray-50" : ""}`}
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{patient.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{patient.name}</div>
                            <div className="text-sm text-muted-foreground">{patient.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{patient.lastConsult}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Badge variant="outline" className="text-xs py-0">
                            {patient.totalCases} Total
                          </Badge>
                          {patient.activeCases > 0 && (
                            <Badge className="text-xs py-0">{patient.activeCases} Active</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      No patients found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-12 lg:col-span-4">
        {selectedPatient ? (
          <>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="text-lg">{selectedPatient.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{selectedPatient.name}</CardTitle>
                  <CardDescription>
                    {selectedPatient.age} year old {selectedPatient.gender}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedPatient.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedPatient.phone}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Case History</h3>
                  <span className="text-xs text-muted-foreground">Total: {selectedPatient.totalCases}</span>
                </div>
                <div className="space-y-2">
                  {selectedPatient.cases.map((caseItem) => (
                    <div key={caseItem.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <div>
                              <p className="font-medium text-sm">{caseItem.condition}</p>
                              <p className="text-xs text-muted-foreground">{caseItem.id}</p>
                            </div>
                          </div>
                        </div>
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
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{caseItem.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Button className="w-full">View Full Medical History</Button>
              </div>
            </CardContent>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] text-center p-6">
            <Users className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium">Patient Details</h3>
            <p className="text-muted-foreground max-w-xs mt-1">
              Select a patient from the list to view their details and case history
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}

