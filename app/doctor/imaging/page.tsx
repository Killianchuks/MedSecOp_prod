import { DashboardSidebar } from "@/components/doctor/dashboard/sidebar"
import { PacsBrowser } from "@/components/doctor/dicom/pacs-browser"

export default function DoctorImagingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Medical Imaging</h1>
              <p className="text-muted-foreground">View and analyze patient imaging studies</p>
            </div>

            <PacsBrowser />
          </div>
        </div>
      </div>
    </div>
  )
}

