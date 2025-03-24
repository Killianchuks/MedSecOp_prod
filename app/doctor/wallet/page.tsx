import { DashboardSidebar } from "@/components/doctor/dashboard/sidebar"
import { PaymentHistory } from "@/components/doctor/wallet/payment-history"

export default function DoctorWalletPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
              <p className="text-muted-foreground">Manage your earnings and payment methods</p>
            </div>

            <PaymentHistory />
          </div>
        </div>
      </div>
    </div>
  )
}

