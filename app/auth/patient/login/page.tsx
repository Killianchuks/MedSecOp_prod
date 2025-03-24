import { LoginForm } from "@/components/auth/login-form"

export default function PatientLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <LoginForm userType="patient" />
    </div>
  )
}

