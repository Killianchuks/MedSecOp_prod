import Link from "next/link"

export default function VerificationFailedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Verification Failed</h1>
          <p className="mt-2 text-gray-600">
            We couldn't verify your email. The verification link may be invalid or expired.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <Link
            href="/auth/verification-pending"
            className="rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Resend Verification Email
          </Link>

          <Link
            href="/"
            className="rounded-md bg-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

