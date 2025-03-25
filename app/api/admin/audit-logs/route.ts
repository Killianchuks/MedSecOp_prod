import { NextRequest, NextResponse } from "next/server"
import { withAuth, UserRole, User } from "@/lib/auth"
import { getSystemAuditLogs } from "@/lib/audit"

export const GET = withAuth(
  async (req: NextRequest, user: User) => {
    try {
      // Parse query parameters
      const url = new URL(req.url)
      const limit = Number.parseInt(url.searchParams.get("limit") || "100")
      const offset = Number.parseInt(url.searchParams.get("offset") || "0")
      const eventTypes = url.searchParams.get("eventTypes")?.split(",")
      const startDate = url.searchParams.get("startDate")
        ? new Date(url.searchParams.get("startDate")!)
        : undefined
      const endDate = url.searchParams.get("endDate")
        ? new Date(url.searchParams.get("endDate")!)
        : undefined
      const userId = url.searchParams.get("userId") || undefined

      // Get audit logs
      const { logs, total } = await getSystemAuditLogs(
        limit,
        offset,
        eventTypes as any,
        startDate,
        endDate,
        userId
      )

      return NextResponse.json(
        {
          logs,
          pagination: {
            total,
            limit,
            offset,
            hasMore: offset + logs.length < total,
          },
        },
        { status: 200 }
      )
    } catch (error: any) {
      console.error("Audit logs retrieval error:", error)
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
    }
  },
  [UserRole.ADMIN] // Only admins are allowed to access this endpoint.
)
