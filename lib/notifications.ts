import { query } from "./db"

// Notification type enum
export enum NotificationType {
  CASE_UPDATE = "case_update",
  PAYMENT = "payment",
  MESSAGE = "message",
  APPOINTMENT = "appointment",
  SYSTEM = "system",
  IMAGE_UPLOAD = "image_upload",
}

// Notification interface
export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  relatedId?: string
  relatedType?: string
  createdAt: Date
}

// Create a notification
export async function createNotification(
  userId: string,
  type: NotificationType,
  title: string,
  message: string,
  relatedId?: string,
  relatedType?: string,
): Promise<{ notification: Notification | null; error: string | null }> {
  try {
    const result = await query(
      `INSERT INTO notifications (
        user_id, type, title, message, related_id, related_type
      ) VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *`,
      [userId, type, title, message, relatedId, relatedType],
    )

    const notification = result.rows[0]

    return {
      notification: {
        id: notification.id,
        userId: notification.user_id,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        isRead: notification.is_read,
        relatedId: notification.related_id,
        relatedType: notification.related_type,
        createdAt: notification.created_at,
      },
      error: null,
    }
  } catch (error: any) {
    console.error("Notification creation error:", error)
    return { notification: null, error: error.message || "Failed to create notification" }
  }
}

// Get notifications for a user
export async function getUserNotifications(
  userId: string,
  unreadOnly = false,
  limit = 20,
  offset = 0,
): Promise<{ notifications: Notification[]; total: number; error: string | null }> {
  try {
    let whereClause = "WHERE user_id = $1"
    const queryParams: any[] = [userId]

    if (unreadOnly) {
      whereClause += " AND is_read = FALSE"
    }

    // Get total count
    const countResult = await query(`SELECT COUNT(*) FROM notifications ${whereClause}`, queryParams)

    const total = Number.parseInt(countResult.rows[0].count)

    // Get paginated results
    const paginatedParams = [...queryParams, limit, offset]
    const result = await query(
      `SELECT * FROM notifications ${whereClause} 
       ORDER BY created_at DESC 
       LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`,
      paginatedParams,
    )

    const notifications = result.rows.map((row) => ({
      id: row.id,
      userId: row.user_id,
      type: row.type,
      title: row.title,
      message: row.message,
      isRead: row.is_read,
      relatedId: row.related_id,
      relatedType: row.related_type,
      createdAt: row.created_at,
    }))

    return { notifications, total, error: null }
  } catch (error: any) {
    console.error("Notifications retrieval error:", error)
    return { notifications: [], total: 0, error: error.message || "Failed to retrieve notifications" }
  }
}

// Mark notifications as read
export async function markNotificationsAsRead(
  notificationIds: string[],
  userId: string,
): Promise<{ success: boolean; error: string | null }> {
  try {
    if (notificationIds.length === 0) {
      return { success: true, error: null }
    }

    // Create placeholders for the query
    const placeholders = notificationIds.map((_, i) => `$${i + 2}`).join(", ")

    const result = await query(
      `UPDATE notifications 
       SET is_read = TRUE 
       WHERE user_id = $1 AND id IN (${placeholders})`,
      [userId, ...notificationIds],
    )

    return { success: true, error: null }
  } catch (error: any) {
    console.error("Mark notifications as read error:", error)
    return { success: false, error: error.message || "Failed to mark notifications as read" }
  }
}

// Send a system notification to all users or specific roles
export async function sendSystemNotification(
  title: string,
  message: string,
  roles?: string[],
  relatedId?: string,
  relatedType?: string,
): Promise<{ success: boolean; error: string | null }> {
  try {
    let whereClause = ""
    const queryParams: any[] = []

    if (roles && roles.length > 0) {
      whereClause = "WHERE role IN (" + roles.map((_, i) => `$${i + 1}`).join(", ") + ")"
      queryParams.push(...roles)
    }

    // Get all relevant users
    const usersResult = await query(`SELECT id FROM user_profiles ${whereClause}`, queryParams)

    const userIds = usersResult.rows.map((row) => row.id)

    // Create notifications for each user
    for (const userId of userIds) {
      await createNotification(userId, NotificationType.SYSTEM, title, message, relatedId, relatedType)
    }

    return { success: true, error: null }
  } catch (error: any) {
    console.error("System notification error:", error)
    return { success: false, error: error.message || "Failed to send system notification" }
  }
}

