import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getCurrentUser, UserRole } from "@/lib/auth"
import { PatientSidebar } from "@/components/patient/dashboard/sidebar"
import { StatsCards } from "@/components/patient/dashboard/stats-cards"
import { RecentCases } from "@/components/patient/dashboard/recent-cases"
import { HealthTimeline } from "@/components/patient/dashboard/health-timeline"
import { UpcomingAppointments } from "@/components/patient/dashboard/upcoming-appointments"
import { PersonalizedDashboard } from "@/components/personalized-dashboard"

export const metadata: Metadata = {
  title: "Patient Dashboard | MedSecOp",
  description: "Manage your healthcare information and appointments",
}

export default async function PatientDashboardPage() {
  // Get current user
  const user = await getCurrentUser()

  // Redirect if not authenticated or not a patient
  if (!user || user.role !== UserRole.PATIENT) {
    redirect("/auth/patient/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PatientSidebar />

      <div className="lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6">
            {/* Personalized dashboard content */}
            <PersonalizedDashboard userId={user.id} userRole={user.role} userName={user.firstName} />

            {/* Stats cards */}
            <StatsCards />

            {/* Main dashboard content */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <div className="md:col-span-1 lg:col-span-4">
                <RecentCases />
              </div>
              <div className="md:col-span-1 lg:col-span-3">
                <UpcomingAppointments />
              </div>
            </div>

            {/* Health timeline */}
            <HealthTimeline />
          </div>
        </div>
      </div>
    </div>
  )
}

