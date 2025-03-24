"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SimplifiedDicomViewer } from "@/components/patient/images/simplified-dicom-viewer"
import { Download, Share2, Maximize2 } from "lucide-react"
import Image from "next/image"

// Sample data for demonstration
const sampleImages = [
  {
    id: 1,
    type: "MRI",
    bodyPart: "Brain",
    date: "2023-10-15",
    facility: "Neurology Center",
    imageUrl: "/placeholder.svg?height=400&width=400",
    description: "T2-weighted MRI scan of the brain",
  },
  {
    id: 2,
    type: "X-Ray",
    bodyPart: "Chest",
    date: "2023-11-02",
    facility: "City General Hospital",
    imageUrl: "/placeholder.svg?height=400&width=400",
    description: "Frontal chest X-ray",
  },
  {
    id: 3,
    type: "CT Scan",
    bodyPart: "Abdomen",
    date: "2023-12-10",
    facility: "Imaging Specialists",
    imageUrl: "/placeholder.svg?height=400&width=400",
    description: "Contrast-enhanced CT scan of the abdomen",
  },
  {
    id: 4,
    type: "MRI",
    bodyPart: "Knee",
    date: "2024-01-05",
    facility: "Sports Medicine Clinic",
    imageUrl: "/placeholder.svg?height=400&width=400",
    description: "T1-weighted MRI of the right knee",
  },
  {
    id: 5,
    type: "X-Ray",
    bodyPart: "Hand",
    date: "2024-01-20",
    facility: "Orthopedic Associates",
    imageUrl: "/placeholder.svg?height=400&width=400",
    description: "X-ray of the left hand",
  },
  {
    id: 6,
    type: "CT Scan",
    bodyPart: "Chest",
    date: "2024-02-08",
    facility: "Pulmonary Specialists",
    imageUrl: "/placeholder.svg?height=400&width=400",
    description: "High-resolution CT scan of the chest",
  },
]

export function ImageGallery() {
  const [filter, setFilter] = useState("all")
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredImages = filter === "all" ? sampleImages : sampleImages.filter((img) => img.type === filter)

  const handleImageClick = (image: any) => {
    setSelectedImage(image)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All Images</TabsTrigger>
          <TabsTrigger value="MRI">MRI</TabsTrigger>
          <TabsTrigger value="X-Ray">X-Ray</TabsTrigger>
          <TabsTrigger value="CT Scan">CT Scan</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredImages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No images found matching your filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="relative h-48 cursor-pointer" onClick={() => handleImageClick(image)}>
                <Image
                  src={image.imageUrl || "/placeholder.svg"}
                  alt={image.description}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/5 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                  <Maximize2 className="h-8 w-8 text-white drop-shadow-md" />
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">
                      {image.type} - {image.bodyPart}
                    </h3>
                    <p className="text-sm text-muted-foreground">{image.date}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm">{image.description}</p>
                <p className="text-xs text-muted-foreground mt-2">Facility: {image.facility}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Image Viewer Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedImage && (
          <DialogContent className="max-w-4xl w-[90vw]">
            <DialogHeader>
              <DialogTitle>
                {selectedImage.type} - {selectedImage.bodyPart}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <SimplifiedDicomViewer imageUrl={selectedImage.imageUrl} />
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <p className="text-sm">{selectedImage.description}</p>
                <p className="text-xs text-muted-foreground">Date: {selectedImage.date}</p>
                <p className="text-xs text-muted-foreground">Facility: {selectedImage.facility}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

