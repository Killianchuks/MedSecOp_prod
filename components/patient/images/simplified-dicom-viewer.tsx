"use client"

import { useState, useRef, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCw, RotateCcw, Contrast } from "lucide-react"

interface SimplifiedDicomViewerProps {
  imageUrl: string
}

export function SimplifiedDicomViewer({ imageUrl }: SimplifiedDicomViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [contrast, setContrast] = useState(1)
  const [brightness, setBrightness] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageUrl

    img.onload = () => {
      // Set canvas dimensions
      canvas.width = img.width
      canvas.height = img.height

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Save context state
      ctx.save()

      // Move to center of canvas
      ctx.translate(canvas.width / 2, canvas.height / 2)

      // Apply zoom
      ctx.scale(zoom, zoom)

      // Apply rotation (convert to radians)
      ctx.rotate((rotation * Math.PI) / 180)

      // Draw image centered
      ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height)

      // Apply contrast and brightness
      if (contrast !== 1 || brightness !== 0) {
        const imageData = ctx.getImageData(-img.width / 2, -img.height / 2, img.width, img.height)

        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          // Apply contrast
          data[i] = ((data[i] / 255 - 0.5) * contrast + 0.5) * 255
          data[i + 1] = ((data[i + 1] / 255 - 0.5) * contrast + 0.5) * 255
          data[i + 2] = ((data[i + 2] / 255 - 0.5) * contrast + 0.5) * 255

          // Apply brightness
          data[i] += brightness * 255
          data[i + 1] += brightness * 255
          data[i + 2] += brightness * 255

          // Clamp values
          data[i] = Math.max(0, Math.min(255, data[i]))
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1]))
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2]))
        }

        ctx.putImageData(imageData, -img.width / 2, -img.height / 2)
      }

      // Restore context state
      ctx.restore()
    }
  }, [imageUrl, zoom, rotation, contrast, brightness])

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 3))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5))
  const handleRotateClockwise = () => setRotation((prev) => prev + 90)
  const handleRotateCounterClockwise = () => setRotation((prev) => prev - 90)

  return (
    <div className="flex flex-col gap-4">
      <div className="relative bg-black rounded-md overflow-hidden flex items-center justify-center h-[50vh]">
        <canvas ref={canvasRef} className="max-w-full max-h-full object-contain" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Zoom: {zoom.toFixed(1)}x</span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handleZoomOut} className="h-8 w-8">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleZoomIn} className="h-8 w-8">
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Slider value={[zoom]} min={0.5} max={3} step={0.1} onValueChange={(value) => setZoom(value[0])} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Rotation: {rotation}°</span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handleRotateCounterClockwise} className="h-8 w-8">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleRotateClockwise} className="h-8 w-8">
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Contrast: {contrast.toFixed(1)}</span>
            <Contrast className="h-4 w-4" />
          </div>
          <Slider value={[contrast]} min={0.5} max={2} step={0.1} onValueChange={(value) => setContrast(value[0])} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Brightness: {brightness.toFixed(1)}</span>
          </div>
          <Slider
            value={[brightness]}
            min={-0.5}
            max={0.5}
            step={0.05}
            onValueChange={(value) => setBrightness(value[0])}
          />
        </div>
      </div>
    </div>
  )
}

