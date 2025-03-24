import { DashboardSidebar } from "@/components/doctor/dashboard/sidebar"
import { ProfileSettings } from "@/components/doctor/settings/profile-settings"

export default function DoctorSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">Manage your account settings and preferences</p>
            </div>

            <ProfileSettings />
          </div>
        </div>
      </div>
    </div>
  )
}

