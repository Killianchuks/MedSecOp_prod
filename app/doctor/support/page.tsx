import { DashboardSidebar } from "@/components/doctor/dashboard/sidebar"
import { SupportPage } from "@/components/doctor/support/support-page"

export default function DoctorSupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Get Help</h1>
              <p className="text-muted-foreground">Contact support or find answers to common questions</p>
            </div>

            <SupportPage />
          </div>
        </div>
      </div>
    </div>
  )
}

