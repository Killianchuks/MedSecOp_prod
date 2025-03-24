import { SignupForm } from "@/components/auth/signup-form"
import { ScrollToTopOnMount } from "@/components/scroll-to-top-on-mount"

export default function PatientSignupPage() {
  return (
    <>
      <ScrollToTopOnMount />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <SignupForm userType="patient" />
      </div>
    </>
  )
}

