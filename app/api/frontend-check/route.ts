import { type NextRequest, NextResponse } from "next/server"
import { withAuth, UserRole } from "@/lib/auth"
import {
  checkFrontendRoutes,
  checkFormValidations,
  checkUserFlows,
  checkComponentInteractions,
} from "@/lib/system-check"

export const GET = withAuth(
  async (req: NextRequest, user) => {
    try {
      // Get frontend checks
      const routes = checkFrontendRoutes()
      const formValidations = checkFormValidations()
      const userFlows = checkUserFlows()
      const componentInteractions = checkComponentInteractions()

      return NextResponse.json(
        {
          routes,
          formValidations,
          userFlows,
          componentInteractions,
          timestamp: new Date().toISOString(),
        },
        { status: 200 },
      )
    } catch (error: any) {
      console.error("Frontend check error:", error)
      return NextResponse.json({ error: "An unexpected error occurred during frontend check" }, { status: 500 })
    }
  },
  [UserRole.ADMIN],
)

