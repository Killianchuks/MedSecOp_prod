import { NextResponse } from "next/server"
// import { withAuth, UserRole } from "@/lib/auth" // Removed withAuth
import { performSystemCheck } from "@/lib/system-check"
import { checkDatabaseConnection } from "@/lib/db"
import { checkPostgresConnection } from "@/lib/server-db"

export async function GET() {
  try {
    // Check database connections
    const supabaseConnected = await checkDatabaseConnection()
    const postgresConnected = await checkPostgresConnection()

    // Perform system check
    const checkResults = await performSystemCheck()

    // Log the system check - Modified to run even if other checks fail
    // await logAuditEvent(user.id, "system_check", { // Removed user context
    //   overall_status: checkResults.overall.status,
    //   components_checked: Object.keys(checkResults).filter((k) => k !== "overall"),
    // })

    // Check other services as needed

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      services: {
        supabase: supabaseConnected ? "connected" : "disconnected",
        postgres: postgresConnected ? "connected" : "disconnected",
        // Add other service checks here
      },
      results: checkResults,
    })
  } catch (error: any) {
    console.error("System check error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "System check failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
// export const GET = withAuth( // Removed withAuth
//   async (req: NextRequest, user) => {
//     try {
//       // Perform system check
//       const checkResults = await performSystemCheck()

//       // Log the system check
//       await logAuditEvent(user.id, "system_check", {
//         overall_status: checkResults.overall.status,
//         components_checked: Object.keys(checkResults).filter((k) => k !== "overall"),
//       })

//       return NextResponse.json(
//         {
//           results: checkResults,
//           timestamp: new Date().toISOString(),
//         },
//         {
//           status: 200,
//           headers: {
//             "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
//             Pragma: "no-cache",
//             Expires: "0",
//             "Surrogate-Control": "no-store",
//           },
//         },
//       )
//     } catch (error: any) {
//       console.error("System check error:", error)
//       return NextResponse.json({ error: "An unexpected error occurred during system check" }, { status: 500 })
//     }
//   },
//   [UserRole.ADMIN],
// )

