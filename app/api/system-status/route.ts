import { NextResponse } from "next/server"
import { performSystemCheck, ComponentStatus } from "@/lib/system-check"

export async function GET() {
  try {
    // Perform system check
    const checkResults = await performSystemCheck()

    // Determine overall status code
    let statusCode = 200
    if (checkResults.overall.status === ComponentStatus.DOWN) {
      statusCode = 503 // Service Unavailable
    } else if (checkResults.overall.status === ComponentStatus.DEGRADED) {
      statusCode = 207 // Multi-Status
    }

    // Format response for status page
    const components = Object.entries(checkResults)
      .filter(([key]) => key !== "overall")
      .map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        status: value.status,
        message: value.message,
      }))

    return NextResponse.json(
      {
        status: checkResults.overall.status,
        message: checkResults.overall.message,
        timestamp: new Date().toISOString(),
        components,
      },
      {
        status: statusCode,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  } catch (error: any) {
    console.error("System status check error:", error)
    return NextResponse.json(
      {
        status: ComponentStatus.DOWN,
        message: "Error checking system status",
        timestamp: new Date().toISOString(),
        error: error.message,
      },
      { status: 500 },
    )
  }
}

