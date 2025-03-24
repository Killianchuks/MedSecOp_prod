import { AdminSidebar } from "@/components/admin/dashboard/sidebar"
import { PlatformSettings } from "@/components/admin/settings/platform-settings"

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">Manage platform settings and configuration</p>
            </div>

            <PlatformSettings />
          </div>
        </div>
      </div>
    </div>
  )
}

