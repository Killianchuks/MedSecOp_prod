import { query } from "./db"

// Audit event types
export type AuditEventType =
  // Authentication events
  | "login"
  | "logout"
  | "password_reset"
  | "profile_update"
  | "access_attempt"
  // Patient events
  | "patient_registered"
  | "patient_updated"
  | "patient_deleted"
  // Doctor events
  | "doctor_registered"
  | "doctor_updated"
  | "doctor_deleted"
  | "doctor_verified"
  // Case events
  | "case_created"
  | "case_updated"
  | "case_accessed"
  | "case_deleted"
  | "case_doctor_assigned"
  // Payment events
  | "payment_intent_created"
  | "payment_processed"
  | "payment_refunded"
  | "payment_failed"
  // Medical image events
  | "image_request_created"
  | "medical_image_uploaded"
  | "medical_image_accessed"
  | "medical_image_deleted"
  // Communication events
  | "message_sent"
  | "message_read"
  | "video_call_started"
  | "video_call_ended"
  // Admin events
  | "admin_action"
  | "system_configuration_changed"

// Audit log interface
export interface AuditLog {
  id: string
  userId: string
  eventType: AuditEventType
  details: Record<string, any>
  ipAddress?: string
  userAgent?: string
  timestamp: Date
}

// Log an audit event
export async function logAuditEvent(
  userId: string,
  eventType: AuditEventType,
  details: Record<string, any> = {},
  ipAddress?: string,
  userAgent?: string,
): Promise<void> {
  try {
    await query(
      `INSERT INTO audit_logs (
        user_id, event_type, details, ip_address, user_agent
      ) VALUES ($1, $2, $3, $4, $5)`,
      [userId, eventType, details, ipAddress, userAgent],
    )
  } catch (error) {
    console.error("Failed to log audit event:", error)
    // Don't throw - audit logging should not block the main flow
  }
}

// Get audit logs for a user
export async function getUserAuditLogs(
  userId: string,
  limit = 100,
  offset = 0,
  eventTypes?: AuditEventType[],
): Promise<{ logs: AuditLog[]; total: number }> {
  try {
    let whereClause = "WHERE user_id = $1"
    const queryParams: any[] = [userId]

    if (eventTypes && eventTypes.length > 0) {
      whereClause += ` AND event_type IN (${eventTypes.map((_, i) => `$${i + 2}`).join(", ")})`
      queryParams.push(...eventTypes)
    }

    // Get total count
    const countResult = await query(`SELECT COUNT(*) FROM audit_logs ${whereClause}`, queryParams)

    const total = Number.parseInt(countResult.rows[0].count)

    // Get paginated results
    const paginatedParams = [...queryParams, limit, offset]
    const result = await query(
      `SELECT * FROM audit_logs ${whereClause} 
       ORDER BY timestamp DESC 
       LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`,
      paginatedParams,
    )

    const logs = result.rows.map((row) => ({
      id: row.id,
      userId: row.user_id,
      eventType: row.event_type,
      details: row.details,
      ipAddress: row.ip_address,
      userAgent: row.user_agent,
      timestamp: row.timestamp,
    }))

    return { logs, total }
  } catch (error) {
    console.error("Failed to retrieve audit logs:", error)
    return { logs: [], total: 0 }
  }
}

// Get system audit logs (admin only)
export async function getSystemAuditLogs(
  limit = 100,
  offset = 0,
  eventTypes?: AuditEventType[],
  startDate?: Date,
  endDate?: Date,
  userId?: string,
): Promise<{ logs: AuditLog[]; total: number }> {
  try {
    let whereClause = ""
    const queryParams: any[] = []
    let paramIndex = 1

    // Build where clause
    const conditions: string[] = []

    if (eventTypes && eventTypes.length > 0) {
      conditions.push(`event_type IN (${eventTypes.map((_, i) => `$${paramIndex + i}`).join(", ")})`)
      queryParams.push(...eventTypes)
      paramIndex += eventTypes.length
    }

    if (startDate) {
      conditions.push(`timestamp >= $${paramIndex}`)
      queryParams.push(startDate)
      paramIndex++
    }

    if (endDate) {
      conditions.push(`timestamp <= $${paramIndex}`)
      queryParams.push(endDate)
      paramIndex++
    }

    if (userId) {
      conditions.push(`user_id = $${paramIndex}`)
      queryParams.push(userId)
      paramIndex++
    }

    if (conditions.length > 0) {
      whereClause = `WHERE ${conditions.join(" AND ")}`
    }

    // Get total count
    const countResult = await query(`SELECT COUNT(*) FROM audit_logs ${whereClause}`, queryParams)

    const total = Number.parseInt(countResult.rows[0].count)

    // Get paginated results
    const paginatedParams = [...queryParams, limit, offset]
    const result = await query(
      `SELECT * FROM audit_logs ${whereClause} 
       ORDER BY timestamp DESC 
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      paginatedParams,
    )

    const logs = result.rows.map((row) => ({
      id: row.id,
      userId: row.user_id,
      eventType: row.event_type,
      details: row.details,
      ipAddress: row.ip_address,
      userAgent: row.user_agent,
      timestamp: row.timestamp,
    }))

    return { logs, total }
  } catch (error) {
    console.error("Failed to retrieve system audit logs:", error)
    return { logs: [], total: 0 }
  }
}

