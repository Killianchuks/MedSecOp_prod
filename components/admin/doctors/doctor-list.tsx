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
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Lock,
  Trash,
  Star,
  CheckCircle,
} from "lucide-react"

// Sample doctor data
const doctors = [
  {
    id: "D-1001",
    name: "Dr. Jane Smith",
    initials: "JS",
    specialty: "Cardiologist",
    email: "dr.smith@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "Jan 15, 2024",
    casesCompleted: 142,
    rating: 4.9,
    status: "Active",
    verified: true,
  },
  {
    id: "D-1002",
    name: "Dr. Michael Chen",
    initials: "MC",
    specialty: "Orthopedic Surgeon",
    email: "dr.chen@example.com",
    phone: "+1 (555) 234-5678",
    joinDate: "Feb 3, 2024",
    casesCompleted: 128,
    rating: 4.8,
    status: "Active",
    verified: true,
  },
  {
    id: "D-1003",
    name: "Dr. Emily Davis",
    initials: "ED",
    specialty: "Dermatologist",
    email: "dr.davis@example.com",
    phone: "+1 (555) 345-6789",
    joinDate: "Mar 10, 2024",
    casesCompleted: 115,
    rating: 4.7,
    status: "Active",
    verified: true,
  },
  {
    id: "D-1004",
    name: "Dr. Robert Wilson",
    initials: "RW",
    specialty: "Endocrinologist",
    email: "dr.wilson@example.com",
    phone: "+1 (555) 456-7890",
    joinDate: "Dec 5, 2023",
    casesCompleted: 98,
    rating: 4.6,
    status: "Active",
    verified: true,
  },
  {
    id: "D-1005",
    name: "Dr. Sarah Johnson",
    initials: "SJ",
    specialty: "Neurologist",
    email: "dr.johnson@example.com",
    phone: "+1 (555) 567-8901",
    joinDate: "Feb 20, 2024",
    casesCompleted: 87,
    rating: 4.5,
    status: "Active",
    verified: true,
  },
  {
    id: "D-1006",
    name: "Dr. David Lee",
    initials: "DL",
    specialty: "Oncologist",
    email: "dr.lee@example.com",
    phone: "+1 (555) 678-9012",
    joinDate: "Jan 8, 2024",
    casesCompleted: 76,
    rating: 4.4,
    status: "Inactive",
    verified: true,
  },
  {
    id: "D-1007",
    name: "Dr. Maria Rodriguez",
    initials: "MR",
    specialty: "Gastroenterologist",
    email: "dr.rodriguez@example.com",
    phone: "+1 (555) 789-0123",
    joinDate: "Mar 15, 2024",
    casesCompleted: 0,
    rating: 0,
    status: "Pending",
    verified: false,
  },
  {
    id: "D-1008",
    name: "Dr. James Taylor",
    initials: "JT",
    specialty: "Pulmonologist",
    email: "dr.taylor@example.com",
    phone: "+1 (555) 890-1234",
    joinDate: "Mar 18, 2024",
    casesCompleted: 0,
    rating: 0,
    status: "Pending",
    verified: false,
  },
]

export function DoctorList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Doctor Management</CardTitle>
              <CardDescription>View and manage doctor accounts</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-auto max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search doctors..."
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
                Add Doctor
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{doctor.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">{doctor.name}</span>
                              {doctor.verified && <CheckCircle className="h-3.5 w-3.5 text-blue-500" />}
                            </div>
                            <div className="text-sm text-muted-foreground">{doctor.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{doctor.specialty}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span>{doctor.email}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span>{doctor.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {doctor.status === "Active" ? (
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{doctor.casesCompleted} cases</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3.5 w-3.5 text-amber-500" />
                              <span>{doctor.rating}/5.0</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">No data</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            doctor.status === "Active"
                              ? "outline"
                              : doctor.status === "Inactive"
                                ? "secondary"
                                : doctor.status === "Pending"
                                  ? "default"
                                  : "destructive"
                          }
                        >
                          {doctor.status}
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
                            {doctor.status === "Pending" ? (
                              <DropdownMenuItem className="text-green-600">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve Doctor
                              </DropdownMenuItem>
                            ) : doctor.status === "Active" ? (
                              <DropdownMenuItem className="text-amber-600">
                                <Lock className="h-4 w-4 mr-2" />
                                Deactivate Account
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
                      No doctors found matching your search.
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

