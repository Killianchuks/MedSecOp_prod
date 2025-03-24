import { type NextRequest, NextResponse } from "next/server"
import { withAuth, UserRole } from "@/lib/auth"
import { query } from "@/lib/db"
import { logAuditEvent } from "@/lib/audit"

// Get system settings
export const GET = withAuth(
  async (req: NextRequest, user) => {
    try {
      // Parse query parameters
      const url = new URL(req.url)
      const key = url.searchParams.get("key")

      let queryText = "SELECT * FROM system_settings"
      const queryParams: any[] = []

      if (key) {
        queryText += " WHERE key = $1"
        queryParams.push(key)
      }

      const result = await query(queryText, queryParams)

      // Log the access
      await logAuditEvent(user.id, "admin_action", {
        action: "get_system_settings",
        key: key || "all",
      })

      return NextResponse.json({ settings: result.rows }, { status: 200 })
    } catch (error: any) {
      console.error("System settings retrieval error:", error)
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
    }
  },
  [UserRole.ADMIN],
)

// Update system settings
export const PUT = withAuth(
  async (req: NextRequest, user) => {
    try {
      const body = await req.json()
      const { key, value, description } = body

      if (!key || !value) {
        return NextResponse.json({ error: "Key and value are required" }, { status: 400 })
      }

      // Check if the setting exists
      const checkResult = await query("SELECT * FROM system_settings WHERE key = $1", [key])

      if (checkResult.rows.length === 0) {
        // Create new setting
        await query(
          `INSERT INTO system_settings (key, value, description, updated_by) 
         VALUES ($1, $2, $3, $4)`,
          [key, value, description, user.id],
        )
      } else {
        // Update existing setting
        await query(
          `UPDATE system_settings 
         SET value = $1, description = $2, updated_by = $3, updated_at = NOW() 
         WHERE key = $4`,
          [value, description, user.id, key],
        )
      }

      // Log the update
      await logAuditEvent(user.id, "system_configuration_changed", {
        key,
        previous_value: checkResult.rows.length > 0 ? checkResult.rows[0].value : null,
        new_value: value,
      })

      return NextResponse.json({ message: "System setting updated successfully" }, { status: 200 })
    } catch (error: any) {
      console.error("System settings update error:", error)
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
    }
  },
  [UserRole.ADMIN],
)

