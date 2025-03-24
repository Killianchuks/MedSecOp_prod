import type { Metadata } from "next"
import { DoctorDashboard } from "@/components/doctor/dashboard"

export const metadata: Metadata = {
  title: "Doctor Dashboard | MedSecOp",
  description: "Manage your patients and appointments",
}

export default function DoctorDashboardPage() {
  return (
    <div className="container mx-auto py-6">
      <DoctorDashboard />
    </div>
  )
}

