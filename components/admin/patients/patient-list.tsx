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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  MoreHorizontal,
  FileText,
  Mail,
  Phone,
  Calendar,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Lock,
  Trash,
} from "lucide-react"

// Sample patient data
const patients = [
  {
    id: "P-1001",
    name: "Sarah Johnson",
    initials: "SJ",
    email: "sarah.j@example.com",
    phone: "+1 (555) 123-4567",
    registrationDate: "Mar 15, 2025",
    totalCases: 8,
    activeCases: 2,
    status: "Active",
  },
  {
    id: "P-1002",
    name: "Michael Brown",
    initials: "MB",
    email: "m.brown@example.com",
    phone: "+1 (555) 234-5678",
    registrationDate: "Mar 12, 2025",
    totalCases: 3,
    activeCases: 0,
    status: "Active",
  },
  {
    id: "P-1003",
    name: "David Wilson",
    initials: "DW",
    email: "d.wilson@example.com",
    phone: "+1 (555) 345-6789",
    registrationDate: "Mar 10, 2025",
    totalCases: 5,
    activeCases: 1,
    status: "Active",
  },
  {
    id: "P-1004",
    name: "Emily Davis",
    initials: "ED",
    email: "e.davis@example.com",
    phone: "+1 (555) 456-7890",
    registrationDate: "Mar 8, 2025",
    totalCases: 2,
    activeCases: 0,
    status: "Active",
  },
  {
    id: "P-1005",
    name: "Robert Miller",
    initials: "RM",
    email: "r.miller@example.com",
    phone: "+1 (555) 567-8901",
    registrationDate: "Mar 5, 2025",
    totalCases: 1,
    activeCases: 0,
    status: "Inactive",
  },
  {
    id: "P-1006",
    name: "Jennifer Adams",
    initials: "JA",
    email: "j.adams@example.com",
    phone: "+1 (555) 678-9012",
    registrationDate: "Mar 16, 2025",
    totalCases: 4,
    activeCases: 1,
    status: "Active",
  },
  {
    id: "P-1007",
    name: "Thomas Walker",
    initials: "TW",
    email: "t.walker@example.com",
    phone: "+1 (555) 789-0123",
    registrationDate: "Mar 3, 2025",
    totalCases: 6,
    activeCases: 0,
    status: "Active",
  },
  {
    id: "P-1008",
    name: "Lisa Martinez",
    initials: "LM",
    email: "l.martinez@example.com",
    phone: "+1 (555) 890-1234",
    registrationDate: "Mar 1, 2025",
    totalCases: 2,
    activeCases: 0,
    status: "Suspended",
  },
]

export function PatientList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<(typeof patients)[0] | null>(null)

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>View and manage patient accounts</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-auto max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
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
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Cases</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
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
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span>{patient.email}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span>{patient.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{patient.registrationDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs py-0">
                            {patient.totalCases} Total
                          </Badge>
                          {patient.activeCases > 0 && (
                            <Badge className="text-xs py-0">{patient.activeCases} Active</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            patient.status === "Active"
                              ? "outline"
                              : patient.status === "Inactive"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {patient.status}
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
                              <FileText className="h-4 w-4 mr-2" />
                              View Cases
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {patient.status === "Active" ? (
                              <DropdownMenuItem className="text-amber-600">
                                <Lock className="h-4 w-4 mr-2" />
                                Suspend Account
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-green-600">
                                <Lock className="h-4 w-4 mr-2" />
                                Activate Account
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="h-4 w-4 mr-2" />
                              Delete Account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No patients found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

