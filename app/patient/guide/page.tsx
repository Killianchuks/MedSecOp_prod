import { Suspense } from "react"
import PatientGuideClient from "@/components/patient/patient-guide-client"

export default function PatientGuidePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PatientGuideClient />
    </Suspense>
  )
}

