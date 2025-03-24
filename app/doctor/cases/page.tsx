import { DashboardSidebar } from "@/components/doctor/dashboard/sidebar"
import CaseList from "@/components/doctor/cases/case-list"

export default function DoctorCasesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Cases</h1>
              <p className="text-muted-foreground">Review and manage your case assignments</p>
            </div>

            <CaseList />
          </div>
        </div>
      </div>
    </div>
  )
}

