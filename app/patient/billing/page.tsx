import { PatientSidebar } from "@/components/patient/dashboard/sidebar"
import { BillingHistory } from "@/components/patient/billing/billing-history"

export default function PatientBillingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PatientSidebar />

      <div className="lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
              <p className="text-muted-foreground">Manage your payment methods and view billing history</p>
            </div>

            <BillingHistory />
          </div>
        </div>
      </div>
    </div>
  )
}

