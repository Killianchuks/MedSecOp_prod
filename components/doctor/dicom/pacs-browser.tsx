"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Download, CalendarIcon, ImageIcon } from "lucide-react"
import { DicomViewer } from "./dicom-viewer"

// Mock studies data
const mockStudies = [
  {
    id: "STUDY-1001",
    patientName: "Sarah Johnson",
    patientId: "P-1001",
    studyDate: "2025-03-15",
    modality: "MRI",
    studyDescription: "Brain MRI with contrast",
    seriesCount: 4,
    imagesCount: 84,
    status: "Available",
  },
  {
    id: "STUDY-1002",
    patientName: "Michael Brown",
    patientId: "P-1002",
    studyDate: "2025-03-12",
    modality: "CT",
    studyDescription: "Chest CT",
    seriesCount: 3,
    imagesCount: 120,
    status: "Available",
  },
  {
    id: "STUDY-1003",
    patientName: "David Wilson",
    patientId: "P-1003",
    studyDate: "2025-03-10",
    modality: "X-Ray",
    studyDescription: "Lumbar Spine X-Ray",
    seriesCount: 2,
    imagesCount: 4,
    status: "Available",
  },
  {
    id: "STUDY-1004",
    patientName: "Emily Davis",
    patientId: "P-1004",
    studyDate: "2025-03-08",
    modality: "Ultrasound",
    studyDescription: "Abdominal Ultrasound",
    seriesCount: 1,
    imagesCount: 15,
    status: "Available",
  },
  {
    id: "STUDY-1005",
    patientName: "Jennifer Adams",
    patientId: "P-1006",
    studyDate: "2025-03-16",
    modality: "MRI",
    studyDescription: "Cardiac MRI",
    seriesCount: 5,
    imagesCount: 120,
    status: "Available",
  },
]

export function PacsBrowser() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null)
  const [modalityFilter, setModalityFilter] = useState<string>("all")

  // Filter studies based on search term and modality
  const filteredStudies = mockStudies.filter((study) => {
    const matchesSearch =
      study.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.studyDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesModality = modalityFilter === "all" || study.modality === modalityFilter

    return matchesSearch && matchesModality
  })

  return (
    <div className="space-y-6">
      {selectedStudy ? (
        <div className="space-y-4">
          <Button variant="outline" onClick={() => setSelectedStudy(null)}>
            Back to Study List
          </Button>
          <DicomViewer studyId={selectedStudy} />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>PACS Browser</CardTitle>
            <CardDescription>Browse and view medical imaging studies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by patient name, ID, or study description..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={modalityFilter} onValueChange={setModalityFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by modality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modalities</SelectItem>
                  <SelectItem value="MRI">MRI</SelectItem>
                  <SelectItem value="CT">CT</SelectItem>
                  <SelectItem value="X-Ray">X-Ray</SelectItem>
                  <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Study</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Modality</TableHead>
                    <TableHead>Series/Images</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudies.length > 0 ? (
                    filteredStudies.map((study) => (
                      <TableRow key={study.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{study.patientName}</div>
                            <div className="text-sm text-muted-foreground">{study.patientId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{study.studyDescription}</div>
                          <div className="text-sm text-muted-foreground">{study.id}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{study.studyDate}</span>
                          </div>
                        </TableCell>
                        <TableCell>{study.modality}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>
                              {study.seriesCount} series / {study.imagesCount} images
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => setSelectedStudy(study.id)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No studies found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

