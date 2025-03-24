import { AdminSidebar } from "@/components/admin/dashboard/sidebar"
import { NotificationManager } from "@/components/admin/notifications/notification-manager"

export default function AdminNotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
              <p className="text-muted-foreground">Manage system notifications and announcements</p>
            </div>

            <NotificationManager />
          </div>
        </div>
      </div>
    </div>
  )
}

