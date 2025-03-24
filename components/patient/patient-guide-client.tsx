"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PatientGuideClient() {
  const searchParams = useSearchParams()
  const [guideData, setGuideData] = useState(null)

  // Get any parameters from the URL
  const guideId = searchParams.get("id")
  const section = searchParams.get("section")

  useEffect(() => {
    // Fetch guide data based on parameters
    // This is a placeholder for your actual data fetching logic
    const fetchData = async () => {
      // Replace with your actual API call
      const data = { id: guideId, section, content: "Patient guide content" }
      setGuideData(data)
    }

    fetchData()
  }, [guideId, section])

  if (!guideData) {
    return <div>Loading guide data...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Patient Guide</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {guideData.section && (
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-500">Section:</span>
            <span className="ml-2">{guideData.section}</span>
          </div>
        )}
        <div className="prose max-w-none">
          {/* Replace with your actual guide content */}
          <p>{guideData.content}</p>
        </div>
      </div>
    </div>
  )
}

