"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ReviewOptionsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReviewOptionsModal({ open, onOpenChange }: ReviewOptionsModalProps) {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState("single")
  const [reviewCount, setReviewCount] = useState(2)

  const pricingOptions = {
    single: 299,
    multiple: {
      2: 499,
      3: 699,
      4: 899,
      5: 1099,
    },
  }

  const getPrice = () => {
    if (selectedOption === "single") {
      return pricingOptions.single
    } else {
      return pricingOptions.multiple[reviewCount as keyof typeof pricingOptions.multiple]
    }
  }

  const handleContinue = () => {
    // Close the modal
    onOpenChange(false)

    // Navigate to the submission form with the selected options as query parameters
    const params = new URLSearchParams({
      reviewOption: selectedOption,
      reviewCount: selectedOption === "multiple" ? reviewCount.toString() : "1",
    })

    router.push(`/patient/submit-opinion?${params.toString()}`)
  }

  const handleSubmit = (option: string, count?: number) => {
    // In production, this would save the selection to state/context or API
    // For now, we'll just close the modal and redirect
    onOpenChange(false)

    // Build the URL with query parameters
    const queryParams = new URLSearchParams()
    queryParams.append("reviewOption", option)
    if (count) {
      queryParams.append("reviewCount", count.toString())
    }

    // Navigate to the submission form with the selected options
    router.push(`/patient/submit-opinion?${queryParams.toString()}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Choose Your Review Option</DialogTitle>
          <DialogDescription>Select the type of medical second opinion you'd like to receive</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="space-y-4">
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="single" id="modal-single" className="mt-1" />
              <div className="grid gap-1.5">
                <Label htmlFor="modal-single" className="text-lg font-medium">
                  Single Specialist Review
                </Label>
                <p className="text-sm text-gray-500">
                  One comprehensive review by a leading specialist in your condition
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="multiple" id="modal-multiple" className="mt-1" />
              <div className="grid gap-1.5">
                <Label htmlFor="modal-multiple" className="text-lg font-medium">
                  Multiple Specialist Reviews
                </Label>
                <p className="text-sm text-gray-500">
                  Get opinions from multiple specialists for more comprehensive insights
                </p>
              </div>
            </div>
          </RadioGroup>

          {selectedOption === "multiple" && (
            <div className="pl-6 mt-4">
              <p className="text-sm font-medium mb-3">Select number of reviews:</p>
              <div className="flex flex-wrap gap-3">
                {[2, 3, 4, 5].map((count) => (
                  <Button
                    key={count}
                    type="button"
                    variant={reviewCount === count ? "default" : "outline"}
                    onClick={() => setReviewCount(count)}
                    className="w-14 h-14 rounded-full"
                  >
                    {count}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Card */}
          <Card className="mt-6 border-primary/20">
            <CardHeader className="bg-primary/5 py-4">
              <CardTitle className="text-lg">Your Selected Package</CardTitle>
              <CardDescription>
                {selectedOption === "single" ? "Single Specialist Review" : `${reviewCount} Specialist Reviews`}
              </CardDescription>
            </CardHeader>
            <CardContent className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">${getPrice()}</p>
                  <p className="text-sm text-gray-500">One-time payment</p>
                </div>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Comprehensive report</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">48-72 hour turnaround</span>
                  </li>
                  {selectedOption === "multiple" && (
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Consensus summary</span>
                    </li>
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleSubmit(selectedOption, selectedOption === "multiple" ? reviewCount : undefined)}>
            Continue to Form
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

