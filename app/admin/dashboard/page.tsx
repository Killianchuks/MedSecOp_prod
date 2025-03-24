import type { Metadata } from "next"
import { AdminDashboard } from "@/components/admin/dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard | MedSecOp",
  description: "Manage the MedSecOp platform",
}

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto py-6">
      <AdminDashboard />
    </div>
  )
}

