import { AdminSidebar } from "@/components/admin/dashboard/sidebar"
import { PatientList } from "@/components/admin/patients/patient-list"

export default function AdminPatientsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Patient Management</h1>
              <p className="text-muted-foreground">View and manage patient accounts and cases</p>
            </div>

            <PatientList />
          </div>
        </div>
      </div>
    </div>
  )
}

