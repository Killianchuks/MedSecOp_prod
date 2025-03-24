import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/auth"
import { getUserNotifications, markNotificationsAsRead } from "@/lib/notifications"

// Get notifications for the current user
export const GET = withAuth(async (req: NextRequest, user) => {
  try {
    // Parse query parameters
    const url = new URL(req.url)
    const unreadOnly = url.searchParams.get("unread") === "true"
    const limit = Number.parseInt(url.searchParams.get("limit") || "20")
    const offset = Number.parseInt(url.searchParams.get("offset") || "0")

    // Get notifications
    const { notifications, total, error } = await getUserNotifications(user.id, unreadOnly, limit, offset)

    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json(
      {
        notifications,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + notifications.length < total,
        },
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Notifications retrieval error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
})

// Mark notifications as read
export const PATCH = withAuth(async (req: NextRequest, user) => {
  try {
    const body = await req.json()
    const { notificationIds } = body

    if (!notificationIds || !Array.isArray(notificationIds) || notificationIds.length === 0) {
      return NextResponse.json({ error: "Notification IDs are required" }, { status: 400 })
    }

    // Mark notifications as read
    const { success, error } = await markNotificationsAsRead(notificationIds, user.id)

    if (!success) {
      return NextResponse.json({ error: error || "Failed to mark notifications as read" }, { status: 400 })
    }

    return NextResponse.json({ message: "Notifications marked as read" }, { status: 200 })
  } catch (error: any) {
    console.error("Mark notifications as read error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
})

