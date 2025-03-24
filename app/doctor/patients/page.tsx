import { DashboardSidebar } from "@/components/doctor/dashboard/sidebar"
import { PatientList } from "@/components/doctor/patients/patient-list"

export default function DoctorPatientsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
              <p className="text-muted-foreground">View and manage your patient relationships</p>
            </div>

            <PatientList />
          </div>
        </div>
      </div>
    </div>
  )
}

