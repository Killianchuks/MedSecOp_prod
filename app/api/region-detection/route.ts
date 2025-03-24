import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Get client IP address using Vercel's headers
    const forwardedFor = request.headers.get("x-forwarded-for")
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown"

    // Simple region detection based on IP (this is a placeholder)
    // In a real implementation, you would use a geolocation service
    let region = "US" // Default

    // For demo purposes, we'll return a random region to simulate IP-based detection
    // In production, replace this with actual IP-based geolocation logic
    if (process.env.NODE_ENV !== "production") {
      const regions = ["US", "UK", "EU", "CANADA", "ASIA", "AUSTRALIA", "AFRICA", "SOUTH_AMERICA"]
      region = regions[Math.floor(Math.random() * regions.length)]
    }

    return NextResponse.json({
      region,
      source: "api",
      ip: process.env.NODE_ENV === "production" ? undefined : ip, // Don't expose IP in production
    })
  } catch (error) {
    console.error("Error in region detection API:", error)
    return NextResponse.json({ error: "Failed to detect region", region: "US" }, { status: 500 })
  }
}

