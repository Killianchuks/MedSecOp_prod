import { AdminSidebar } from "@/components/admin/dashboard/sidebar"
import { BillingOverview } from "@/components/admin/billing/billing-overview"

export default function AdminBillingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Billing & Finance</h1>
              <p className="text-muted-foreground">Manage platform revenue, payouts, and financial reports</p>
            </div>

            <BillingOverview />
          </div>
        </div>
      </div>
    </div>
  )
}

