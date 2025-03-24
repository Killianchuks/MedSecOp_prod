"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, File, Image } from "lucide-react"

export function FileUploader() {
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
        <input
          type="file"
          id="file-upload"
          multiple
          className="hidden"
          onChange={handleFileChange}
          accept=".dcm,.jpg,.jpeg,.png,.pdf"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="font-medium">Drag and drop files here or click to browse</p>
          <p className="text-sm text-muted-foreground mt-1">Supports DICOM, JPEG, PNG, and PDF files</p>
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Selected Files ({files.length})</p>
          <div className="max-h-40 overflow-y-auto space-y-2 border rounded-md p-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-muted/30 rounded p-2 text-sm">
                <div className="flex items-center overflow-hidden">
                  {file.type.includes("image") ? (
                    <Image className="h-4 w-4 mr-2 shrink-0" />
                  ) : (
                    <File className="h-4 w-4 mr-2 shrink-0" />
                  )}
                  <span className="truncate">{file.name}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => removeFile(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

