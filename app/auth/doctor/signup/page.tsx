import { SignupForm } from "@/components/auth/signup-form"
import { ScrollToTopOnMount } from "@/components/scroll-to-top-on-mount"

// Client component that uses useSearchParams
export default function DoctorSignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <ScrollToTopOnMount />
      <SignupForm userType="doctor" />
    </div>
  )
}

