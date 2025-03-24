export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      <h2 className="mt-4 text-xl font-semibold text-gray-700">Loading patient guide...</h2>
      <p className="mt-2 text-gray-500">Please wait while we prepare your information.</p>
    </div>
  )
}

