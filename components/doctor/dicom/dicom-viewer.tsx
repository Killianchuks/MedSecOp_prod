"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ZoomIn, ZoomOut, RotateCw, RotateCcw, Maximize, Minimize, Contrast, Layers } from "lucide-react"

export function DicomViewer({ studyId }: { studyId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [windowWidth, setWindowWidth] = useState(400)
  const [windowCenter, setWindowCenter] = useState(40)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const [totalImages, setTotalImages] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [studyData, setStudyData] = useState<any>(null)

  // Mock study data - in a real implementation, this would come from a PACS server
  useEffect(() => {
    // Simulate loading DICOM data
    setIsLoading(true)
    setTimeout(() => {
      // Mock data for demonstration
      const mockStudy = {
        patientName: "Sarah Johnson",
        patientId: "P-1001",
        studyDate: "2025-03-15",
        modality: "MRI",
        studyDescription: "Brain MRI with contrast",
        seriesList: [
          {
            seriesNumber: 1,
            seriesDescription: "T1-weighted",
            imageCount: 24,
          },
          {
            seriesNumber: 2,
            seriesDescription: "T2-weighted",
            imageCount: 24,
          },
          {
            seriesNumber: 3,
            seriesDescription: "FLAIR",
            imageCount: 24,
          },
          {
            seriesNumber: 4,
            seriesDescription: "DWI",
            imageCount: 12,
          },
        ],
      }

      setStudyData(mockStudy)
      setTotalImages(24) // For the first series
      setIsLoading(false)

      // Draw a placeholder image on the canvas
      drawPlaceholderImage()
    }, 1500)
  }, [studyId])

  // Function to draw a placeholder image on the canvas
  const drawPlaceholderImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set canvas dimensions
    canvas.width = 512
    canvas.height = 512

    // Create a gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#f0f0f0")
    gradient.addColorStop(1, "#d0d0d0")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw a mock brain MRI slice
    ctx.beginPath()
    ctx.ellipse(canvas.width / 2, canvas.height / 2, 180, 220, 0, 0, 2 * Math.PI)
    ctx.fillStyle = "#a0a0a0"
    ctx.fill()

    // Draw some internal structures
    ctx.beginPath()
    ctx.ellipse(canvas.width / 2, canvas.height / 2, 80, 100, 0, 0, 2 * Math.PI)
    ctx.fillStyle = "#808080"
    ctx.fill()

    // Apply window/level
    applyWindowLevel(ctx, canvas.width, canvas.height)

    // Add some text
    ctx.font = "14px Arial"
    ctx.fillStyle = "white"
    ctx.fillText(`Image: ${currentImage + 1}/${totalImages}`, 10, 20)
    ctx.fillText(`W: ${windowWidth} L: ${windowCenter}`, 10, 40)
    ctx.fillText(`Zoom: ${zoom.toFixed(1)}x`, 10, 60)

    // Add a watermark
    ctx.font = "16px Arial"
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
    ctx.fillText("MedSecOp DICOM Viewer", canvas.width - 200, canvas.height - 20)
  }

  // Function to apply window/level adjustments
  const applyWindowLevel = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // In a real implementation, this would adjust pixel values based on window/level
    // For the mock version, we'll just add an overlay to simulate the effect
    ctx.fillStyle = `rgba(0, 0, 0, ${0.5 - windowCenter / 100})`
    ctx.fillRect(0, 0, width, height)
  }

  // Handle zoom in
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 3))
  }

  // Handle zoom out
  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  // Handle rotation clockwise
  const handleRotateCw = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  // Handle rotation counter-clockwise
  const handleRotateCcw = () => {
    setRotation((prev) => (prev - 90 + 360) % 360)
  }

  // Handle fullscreen toggle
  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Handle next image
  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % totalImages)
  }

  // Handle previous image
  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages)
  }

  // Update canvas when parameters change
  useEffect(() => {
    if (!isLoading) {
      drawPlaceholderImage()
    }
  }, [windowWidth, windowCenter, zoom, rotation, currentImage, isLoading])

  return (
    <div className={`dicom-viewer ${isFullscreen ? "fixed inset-0 z-50 bg-black p-4" : ""}`}>
      <Card className={`${isFullscreen ? "h-full" : ""}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>DICOM Viewer</CardTitle>
              {studyData && (
                <CardDescription>
                  {studyData.patientName} - {studyData.studyDescription}
                </CardDescription>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={handleFullscreenToggle}>
              {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className={`flex flex-col ${isFullscreen ? "h-[calc(100%-80px)]" : ""}`}>
          {isLoading ? (
            <div className="flex items-center justify-center h-[512px] bg-gray-100 rounded-md">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-500">Loading DICOM data...</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-4 h-full">
              <div className="md:w-3/4">
                <div
                  className="relative bg-black rounded-md overflow-hidden"
                  style={{ height: isFullscreen ? "calc(100vh - 200px)" : "512px" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <canvas
                      ref={canvasRef}
                      className="max-w-full max-h-full"
                      style={{
                        transform: `scale(${zoom}) rotate(${rotation}deg)`,
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </div>

                  {/* Image navigation overlay */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    <Button variant="secondary" size="sm" onClick={handlePrevImage}>
                      Previous
                    </Button>
                    <div className="bg-black/50 text-white px-3 py-1 rounded-md">
                      {currentImage + 1} / {totalImages}
                    </div>
                    <Button variant="secondary" size="sm" onClick={handleNextImage}>
                      Next
                    </Button>
                  </div>
                </div>

                {/* Toolbar */}
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  <Button variant="outline" size="icon" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleRotateCw}>
                    <RotateCw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleRotateCcw}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-2 ml-4">
                    <Contrast className="h-4 w-4" />
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs w-12">Width: {windowWidth}</span>
                        <Slider
                          value={[windowWidth]}
                          min={1}
                          max={1000}
                          step={1}
                          onValueChange={(value) => setWindowWidth(value[0])}
                          className="w-32"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs w-12">Level: {windowCenter}</span>
                        <Slider
                          value={[windowCenter]}
                          min={-500}
                          max={500}
                          step={1}
                          onValueChange={(value) => setWindowCenter(value[0])}
                          className="w-32"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Study browser panel */}
              <div className={`md:w-1/4 ${isFullscreen ? "h-full" : ""}`}>
                <Tabs defaultValue="series">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="series">Series</TabsTrigger>
                    <TabsTrigger value="info">Info</TabsTrigger>
                  </TabsList>
                  <TabsContent value="series" className="border rounded-md p-2 h-[400px] overflow-y-auto">
                    {studyData?.seriesList.map((series: any) => (
                      <div
                        key={series.seriesNumber}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                        onClick={() => setTotalImages(series.imageCount)}
                      >
                        <Layers className="h-5 w-5 text-gray-500" />
                        <div>
                          <div className="font-medium text-sm">{series.seriesDescription}</div>
                          <div className="text-xs text-gray-500">{series.imageCount} images</div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="info" className="border rounded-md p-3 h-[400px] overflow-y-auto">
                    {studyData && (
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-gray-500">Patient Name</div>
                          <div className="font-medium">{studyData.patientName}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Patient ID</div>
                          <div className="font-medium">{studyData.patientId}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Study Date</div>
                          <div className="font-medium">{studyData.studyDate}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Modality</div>
                          <div className="font-medium">{studyData.modality}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Study Description</div>
                          <div className="font-medium">{studyData.studyDescription}</div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

