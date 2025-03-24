"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DicomViewer } from "../dicom/dicom-viewer"
import { ImageIcon, Eye } from "lucide-react"

interface CaseImagingProps {
  caseId: string
}

// Mock imaging studies for a case
const mockImagingStudies = [
  {
    id: "STUDY-1001",
    date: "2025-03-15",
    modality: "MRI",
    description: "Brain MRI with contrast",
    seriesCount: 4,
    imagesCount: 84,
  },
  {
    id: "STUDY-1002",
    date: "2025-03-10",
    modality: "CT",
    description: "Head CT",
    seriesCount: 2,
    imagesCount: 45,
  },
]

export function CaseImaging({ caseId }: CaseImagingProps) {
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Imaging Studies</CardTitle>
        <CardDescription>View and analyze patient imaging for this case</CardDescription>
      </CardHeader>
      <CardContent>
        {selectedStudy ? (
          <div className="space-y-4">
            <Button variant="outline" onClick={() => setSelectedStudy(null)}>
              Back to Study List
            </Button>
            <DicomViewer studyId={selectedStudy} />
          </div>
        ) : (
          <div className="space-y-4">
            {mockImagingStudies.map((study) => (
              <div
                key={study.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 rounded-full">
                    <ImageIcon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">{study.description}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{study.date}</span>
                      <span>•</span>
                      <span>{study.modality}</span>
                      <span>•</span>
                      <span>
                        {study.seriesCount} series / {study.imagesCount} images
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedStudy(study.id)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}

            {mockImagingStudies.length === 0 && (
              <div className="text-center py-8 border rounded-lg">
                <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
                <h3 className="text-lg font-medium">No Imaging Studies</h3>
                <p className="text-muted-foreground max-w-xs mx-auto mt-1">
                  This case doesn't have any imaging studies attached.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

