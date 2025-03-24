"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Search, Edit, RefreshCw, Eye, UserPlus } from "lucide-react"

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: string
}

interface Case {
  id: number
  patientId: number
  doctorId?: number
  title: string
  description: string
  status: "PENDING" | "ASSIGNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  createdAt: string
  updatedAt: string
  completedAt?: string
  patient: {
    firstName: string
    lastName: string
    email: string
  }
  doctor?: {
    firstName: string
    lastName: string
    email: string
  }
}

export function CaseManagement() {
  const [cases, setCases] = useState<Case[]>([])
  const [doctors, setDoctors] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const [currentCase, setCurrentCase] = useState<Case | null>(null)
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("")
  const [selectedStatus, setSelectedStatus] = useState<string>("")

  // Fetch cases and doctors on component mount
  useEffect(() => {
    fetchCases()
    fetchDoctors()
  }, [])

  const fetchCases = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/cases")
      if (!response.ok) throw new Error("Failed to fetch cases")
      const data = await response.json()
      setCases(data.cases)
    } catch (error) {
      console.error("Error fetching cases:", error)
      toast({
        title: "Error",
        description: "Failed to load cases. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchDoctors = async () => {
    try {
      const response = await fetch("/api/admin/users?role=DOCTOR")
      if (!response.ok) throw new Error("Failed to fetch doctors")
      const data = await response.json()
      setDoctors(data.users)
    } catch (error) {
      console.error("Error fetching doctors:", error)
      toast({
        title: "Error",
        description: "Failed to load doctors. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAssignCase = async () => {
    if (!currentCase || !selectedDoctorId) return

    try {
      const response = await fetch(`/api/admin/cases/${currentCase.id}/assign`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctorId: Number.parseInt(selectedDoctorId) }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to assign case")
      }

      toast({
        title: "Success",
        description: "Case assigned successfully",
      })

      setIsAssignDialogOpen(false)
      fetchCases()
    } catch (error) {
      console.error("Error assigning case:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to assign case",
        variant: "destructive",
      })
    }
  }

  const handleUpdateStatus = async () => {
    if (!currentCase || !selectedStatus) return

    try {
      const response = await fetch(`/api/admin/cases/${currentCase.id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selectedStatus }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to update case status")
      }

      toast({
        title: "Success",
        description: "Case status updated successfully",
      })

      setIsStatusDialogOpen(false)
      fetchCases()
    } catch (error) {
      console.error("Error updating case status:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update case status",
        variant: "destructive",
      })
    }
  }

  const openViewDialog = (caseItem: Case) => {
    setCurrentCase(caseItem)
    setIsViewDialogOpen(true)
  }

  const openAssignDialog = (caseItem: Case) => {
    setCurrentCase(caseItem)
    setSelectedDoctorId(caseItem.doctorId?.toString() || "")
    setIsAssignDialogOpen(true)
  }

  const openStatusDialog = (caseItem: Case) => {
    setCurrentCase(caseItem)
    setSelectedStatus(caseItem.status)
    setIsStatusDialogOpen(true)
  }

  const filteredCases = cases.filter(
    (caseItem) =>
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (caseItem.doctor &&
        (caseItem.doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          caseItem.doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()))),
  )

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "LOW":
        return "bg-gray-100 text-gray-800"
      case "MEDIUM":
        return "bg-blue-100 text-blue-800"
      case "HIGH":
        return "bg-orange-100 text-orange-800"
      case "URGENT":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "ASSIGNED":
        return "bg-blue-100 text-blue-800"
      case "IN_PROGRESS":
        return "bg-purple-100 text-purple-800"
      case "COMPLETED":
        return "bg-green-100 text-green-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Case Management</h2>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cases..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={fetchCases}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  Loading cases...
                </TableCell>
              </TableRow>
            ) : filteredCases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No cases found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCases.map((caseItem) => (
                <TableRow key={caseItem.id}>
                  <TableCell>{caseItem.id}</TableCell>
                  <TableCell>{caseItem.title}</TableCell>
                  <TableCell>
                    {caseItem.patient.firstName} {caseItem.patient.lastName}
                  </TableCell>
                  <TableCell>
                    {caseItem.doctor ? (
                      `${caseItem.doctor.firstName} ${caseItem.doctor.lastName}`
                    ) : (
                      <span className="text-muted-foreground">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadgeClass(caseItem.priority)}`}
                    >
                      {caseItem.priority}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(caseItem.status)}`}
                    >
                      {caseItem.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(caseItem.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="icon" onClick={() => openViewDialog(caseItem)} title="View Case">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openAssignDialog(caseItem)}
                        title="Assign Doctor"
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openStatusDialog(caseItem)}
                        title="Update Status"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Case Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Case Details</DialogTitle>
          </DialogHeader>
          {currentCase && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Case ID</h3>
                  <p>{currentCase.id}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Created</h3>
                  <p>{new Date(currentCase.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Title</h3>
                <p className="font-medium text-lg">{currentCase.title}</p>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Description</h3>
                <p className="whitespace-pre-wrap">{currentCase.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Priority</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadgeClass(currentCase.priority)}`}
                  >
                    {currentCase.priority}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Status</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(currentCase.status)}`}
                  >
                    {currentCase.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Patient</h3>
                  <p>
                    {currentCase.patient.firstName} {currentCase.patient.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{currentCase.patient.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Doctor</h3>
                  {currentCase.doctor ? (
                    <>
                      <p>
                        {currentCase.doctor.firstName} {currentCase.doctor.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">{currentCase.doctor.email}</p>
                    </>
                  ) : (
                    <p className="text-muted-foreground">Unassigned</p>
                  )}
                </div>
              </div>

              {currentCase.completedAt && (
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Completed</h3>
                  <p>{new Date(currentCase.completedAt).toLocaleString()}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Doctor Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Doctor</DialogTitle>
            <DialogDescription>Select a doctor to assign to this case.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentCase && (
              <div className="mb-4">
                <h3 className="font-semibold">Case: {currentCase.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Patient: {currentCase.patient.firstName} {currentCase.patient.lastName}
                </p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor</Label>
              <Select value={selectedDoctorId} onValueChange={setSelectedDoctorId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id.toString()}>
                      {doctor.firstName} {doctor.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAssignCase} disabled={!selectedDoctorId}>
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Case Status</DialogTitle>
            <DialogDescription>Change the status of this case.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentCase && (
              <div className="mb-4">
                <h3 className="font-semibold">Case: {currentCase.title}</h3>
                <p className="text-sm text-muted-foreground">Current Status: {currentCase.status}</p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="status">New Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="ASSIGNED">Assigned</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleUpdateStatus} disabled={!selectedStatus}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

