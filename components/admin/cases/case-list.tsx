"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  MoreHorizontal,
  Calendar,
  Filter,
  Download,
  Eye,
  Edit,
  UserCog,
  AlertTriangle,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

// Sample case data
const cases = [
  {
    id: "CASE-1241",
    title: "Atrial Fibrillation Consultation",
    patient: {
      name: "Sarah Johnson",
      initials: "SJ",
      id: "P-1001",
    },
    doctor: {
      name: "Dr. Jane Smith",
      initials: "JS",
      id: "D-1001",
    },
    specialty: "Cardiology",
    submissionDate: "Mar 19, 2025",
    dueDate: "Mar 22, 2025",
    status: "Unassigned",
    urgency: "Normal",
    price: 350,
  },
  {
    id: "CASE-1240",
    title: "Mitral Valve Prolapse Evaluation",
    patient: {
      name: "Jennifer Adams",
      initials: "JA",
      id: "P-1006",
    },
    doctor: {
      name: "Dr. Jane Smith",
      initials: "JS",
      id: "D-1001",
    },
    specialty: "Cardiology",
    submissionDate: "Mar 16, 2025",
    dueDate: "Mar 19, 2025",
    status: "In Progress",
    urgency: "Normal",
    price: 350,
  },
  {
    id: "CASE-1239",
    title: "Coronary Artery Disease Assessment",
    patient: {
      name: "Thomas Walker",
      initials: "TW",
      id: "P-1007",
    },
    doctor: null,
    specialty: "Cardiology",
    submissionDate: "Mar 15, 2025",
    dueDate: "Mar 18, 2025",
    status: "Unassigned",
    urgency: "High",
    price: 450,
  },
  {
    id: "CASE-1238",
    title: "Hypertension Management Review",
    patient: {
      name: "Michael Brown",
      initials: "MB",
      id: "P-1002",
    },
    doctor: {
      name: "Dr. Jane Smith",
      initials: "JS",
      id: "D-1001",
    },
    specialty: "Cardiology",
    submissionDate: "Mar 14, 2025",
    dueDate: "Mar 17, 2025",
    status: "In Progress",
    urgency: "Normal",
    price: 350,
  },
  {
    id: "CASE-1237",
    title: "Chronic Migraine Treatment Review",
    patient: {
      name: "David Wilson",
      initials: "DW",
      id: "P-1003",
    },
    doctor: {
      name: "Dr. Sarah Johnson",
      initials: "SJ",
      id: "D-1005",
    },
    specialty: "Neurology",
    submissionDate: "Mar 13, 2025",
    dueDate: "Mar 16, 2025",
    status: "In Progress",
    urgency: "Normal",
    price: 350,
  },
  {
    id: "CASE-1236",
    title: "Skin Lesion Assessment",
    patient: {
      name: "Emily Davis",
      initials: "ED",
      id: "P-1004",
    },
    doctor: {
      name: "Dr. Emily Davis",
      initials: "ED",
      id: "D-1003",
    },
    specialty: "Dermatology",
    submissionDate: "Mar 10, 2025",
    dueDate: "Mar 13, 2025",
    status: "Completed",
    completionDate: "Mar 13, 2025",
    urgency: "Normal",
    price: 300,
  },
  {
    id: "CASE-1235",
    title: "Thyroid Nodule Evaluation",
    patient: {
      name: "Robert Miller",
      initials: "RM",
      id: "P-1005",
    },
    doctor: {
      name: "Dr. Robert Wilson",
      initials: "RW",
      id: "D-1004",
    },
    specialty: "Endocrinology",
    submissionDate: "Mar 5, 2025",
    dueDate: "Mar 8, 2025",
    status: "Completed",
    completionDate: "Mar 9, 2025",
    urgency: "Normal",
    price: 350,
  },
]

export function CaseList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCases = cases.filter(
    (caseItem) =>
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.doctor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false ||
      caseItem.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getCasesByTab = (tab: string) => {
    return filteredCases.filter((c) => {
      if (tab === "unassigned") return c.status === "Unassigned"
      if (tab === "in-progress") return c.status === "In Progress"
      if (tab === "completed") return c.status === "Completed"
      return true
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Case Management</CardTitle>
              <CardDescription>View and manage second opinion cases</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-auto max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cases..."
                  className="pl-8 w-full sm:w-[260px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="all">All Cases</TabsTrigger>
              <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            {["all", "unassigned", "in-progress", "completed"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Case</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getCasesByTab(tab).length > 0 ? (
                        getCasesByTab(tab).map((caseItem) => (
                          <TableRow key={caseItem.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{caseItem.title}</div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>{caseItem.id}</span>
                                  <span>•</span>
                                  <span>{caseItem.specialty}</span>
                                </div>
                                {caseItem.urgency === "High" && (
                                  <Badge variant="destructive" className="mt-1">
                                    Urgent
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-7 w-7">
                                  <AvatarFallback className="text-xs">{caseItem.patient.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-sm font-medium">{caseItem.patient.name}</div>
                                  <div className="text-xs text-muted-foreground">{caseItem.patient.id}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {caseItem.doctor ? (
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-7 w-7">
                                    <AvatarFallback className="text-xs">{caseItem.doctor.initials}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="text-sm font-medium">{caseItem.doctor.name}</div>
                                    <div className="text-xs text-muted-foreground">{caseItem.doctor.id}</div>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <AlertCircle className="h-4 w-4 mr-1" />
                                  <span>Not Assigned</span>
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center text-sm">
                                  <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                  <span>Submitted: {caseItem.submissionDate}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                  <span>
                                    {caseItem.status === "Completed"
                                      ? `Completed: ${caseItem.completionDate}`
                                      : `Due: ${caseItem.dueDate}`}
                                  </span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
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
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Case
                                  </DropdownMenuItem>
                                  {caseItem.status === "Unassigned" && (
                                    <DropdownMenuItem>
                                      <UserCog className="h-4 w-4 mr-2" />
                                      Assign Doctor
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  {caseItem.urgency !== "High" && caseItem.status !== "Completed" && (
                                    <DropdownMenuItem className="text-amber-600">
                                      <AlertTriangle className="h-4 w-4 mr-2" />
                                      Mark as Urgent
                                    </DropdownMenuItem>
                                  )}
                                  {caseItem.status === "In Progress" && (
                                    <DropdownMenuItem className="text-green-600">
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Mark as Completed
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No cases found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

