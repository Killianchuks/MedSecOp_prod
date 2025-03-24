"use client"

import { useSearchParams } from "next/navigation"
import { PatientSidebar } from "@/components/patient/dashboard/sidebar"
import { SubmissionForm } from "@/components/patient/submit-opinion/submission-form"
import { ScrollToTopOnMount } from "@/components/scroll-to-top-on-mount"

export default function SubmitOpinionPage() {
  const searchParams = useSearchParams()
  const reviewOption = searchParams.get("reviewOption")
  const reviewCount = searchParams.get("reviewCount")

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTopOnMount />
      <PatientSidebar />

      <div className="lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Submit a Second Opinion Request</h1>
            <p className="text-muted-foreground">
              Complete the form below to request a medical second opinion from our specialists
              {reviewOption && reviewCount && reviewOption === "multiple" && ` (${reviewCount} specialists)`}
              {reviewOption && reviewOption === "single" && " (single specialist)"}
            </p>
          </div>

          <SubmissionForm />
        </div>
      </div>
    </div>
  )
}

