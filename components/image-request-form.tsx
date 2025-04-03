"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
// Try a different approach - don't use toast at all for now
// import { toast } from "@/components/ui/use-toast"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Define the props interface for the component
export interface ImageRequestFormProps {
  onComplete?: () => void
}

export function ImageRequestForm({ onComplete }: ImageRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [facilityName, setFacilityName] = useState("")
  const [facilityType, setFacilityType] = useState("")
  const [examType, setExamType] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [additionalInfo, setAdditionalInfo] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Remove toast calls for now
      console.log("Request submitted successfully")

      // Call onComplete when done
      if (onComplete) {
        onComplete()
      }
    } catch (error) {
      console.error("Error submitting request:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Request Medical Images</h2>
            <p className="text-muted-foreground">
              Fill out this form to request your medical images from a healthcare facility.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="facilityName">Facility Name</Label>
              <Input
                id="facilityName"
                placeholder="Enter healthcare facility name"
                value={facilityName}
                onChange={(e) => setFacilityName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="facilityType">Facility Type</Label>
              <Select value={facilityType} onValueChange={setFacilityType}>
                <SelectTrigger id="facilityType">
                  <SelectValue placeholder="Select facility type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hospital">Hospital</SelectItem>
                  <SelectItem value="imaging-center">Imaging Center</SelectItem>
                  <SelectItem value="clinic">Clinic</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="examType">Exam Type</Label>
              <Input
                id="examType"
                placeholder="e.g., X-Ray, MRI, CT Scan"
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="examDate">Approximate Exam Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="examDate"
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date ? "text-muted-foreground" : "")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              placeholder="Provide any additional details that might help locate your images"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onComplete}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

