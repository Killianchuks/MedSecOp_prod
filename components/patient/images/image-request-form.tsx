"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export function ImageRequestForm() {
  const [date, setDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      toast({
        title: "Image transfer request submitted",
        description: "The healthcare facility will be notified of your request.",
      })
    }, 1500)
  }

  if (isSuccess) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center py-10">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-medium mb-2">Request Submitted Successfully</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Your medical image transfer request has been submitted. The healthcare facility will be notified, and
              you'll receive an update when your images are available.
            </p>
            <Button onClick={() => setIsSuccess(false)}>Submit Another Request</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Medical Image Transfer</CardTitle>
        <CardDescription>
          Request your medical images to be transferred directly from your healthcare provider to MedSecOp
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="facilityName">Healthcare Facility Name</Label>
            <Input id="facilityName" placeholder="Enter the name of the hospital or clinic" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="facilityPhone">Facility Phone Number</Label>
              <Input id="facilityPhone" type="tel" placeholder="(555) 123-4567" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facilityEmail">Facility Email (Optional)</Label>
              <Input id="facilityEmail" type="email" placeholder="facility@example.com" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="facilityAddress">Facility Address</Label>
            <Textarea id="facilityAddress" placeholder="Enter the complete address" required />
          </div>

          <div className="space-y-2">
            <Label>Date of Imaging</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${!date ? "text-muted-foreground" : ""}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageType">Type of Imaging</Label>
            <Select required>
              <SelectTrigger id="imageType">
                <SelectValue placeholder="Select imaging type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xray">X-Ray</SelectItem>
                <SelectItem value="mri">MRI</SelectItem>
                <SelectItem value="ct">CT Scan</SelectItem>
                <SelectItem value="ultrasound">Ultrasound</SelectItem>
                <SelectItem value="mammogram">Mammogram</SelectItem>
                <SelectItem value="pet">PET Scan</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bodyPart">Body Part/Region</Label>
            <Input id="bodyPart" placeholder="e.g., Chest, Brain, Knee" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              placeholder="Any additional details that might help locate your images"
              rows={3}
            />
          </div>

          <div className="flex items-start space-x-2 pt-2">
            <Checkbox id="consent" required />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="consent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I authorize the release of my medical images
              </label>
              <p className="text-sm text-muted-foreground">
                By checking this box, you authorize the healthcare facility to release your medical images to MedSecOp.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

