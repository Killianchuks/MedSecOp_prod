import { AdminSidebar } from "@/components/admin/dashboard/sidebar"
import { CaseList } from "@/components/admin/cases/case-list"
import { CaseStatusNotifications } from "@/components/admin/notifications/case-status-notification"

export default function AdminCasesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Case Management</h1>
              <p className="text-muted-foreground">View and manage second opinion cases</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CaseList />
              </div>
              <div>
                <CaseStatusNotifications />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

