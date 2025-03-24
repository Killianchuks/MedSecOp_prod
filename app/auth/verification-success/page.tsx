import Link from "next/link"

export default function VerificationSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Email Verified!</h1>
          <p className="mt-2 text-gray-600">
            Your email has been successfully verified. You can now log in to your account.
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            href="/auth/patient/login"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

