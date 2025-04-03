import { sql, query } from "./db"

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
  // Issue events
  | "issue_created"
  | "issue_updated"

// Define a type for database rows
interface DbRow {
  id: string
  user_id: string
  event_type: string
  details: Record<string, any>
  ip_address: string | null
  user_agent: string | null
  timestamp: Date
  count?: string
}

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
    await sql`
      INSERT INTO audit_logs (
        user_id, event_type, details, ip_address, user_agent
      ) VALUES (${userId}, ${eventType}, ${details}, ${ipAddress}, ${userAgent})
    `
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
    // Get total count
    let countQuery
    if (eventTypes && eventTypes.length > 0) {
      countQuery = await sql`
        SELECT COUNT(*) FROM audit_logs 
        WHERE user_id = ${userId} 
        AND event_type IN (${eventTypes})
      `
    } else {
      countQuery = await sql`
        SELECT COUNT(*) FROM audit_logs 
        WHERE user_id = ${userId}
      `
    }

    const total = Number.parseInt(countQuery.rows[0].count)

    // Get paginated results
    let result
    if (eventTypes && eventTypes.length > 0) {
      result = await sql`
        SELECT * FROM audit_logs 
        WHERE user_id = ${userId} 
        AND event_type IN (${eventTypes})
        ORDER BY timestamp DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
    } else {
      result = await sql`
        SELECT * FROM audit_logs 
        WHERE user_id = ${userId}
        ORDER BY timestamp DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
    }

    const logs = result.rows.map((row: DbRow) => ({
      id: row.id,
      userId: row.user_id,
      eventType: row.event_type as AuditEventType,
      details: row.details,
      ipAddress: row.ip_address || undefined,
      userAgent: row.user_agent || undefined,
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
    // Build dynamic query parts
    const conditions = []
    const queryParams: any[] = []
    let paramIndex = 1

    // Build WHERE clause
    if (eventTypes && eventTypes.length > 0) {
      const placeholders = eventTypes.map(() => `$${paramIndex++}`).join(", ")
      conditions.push(`event_type IN (${placeholders})`)
      queryParams.push(...eventTypes)
    }

    if (startDate) {
      conditions.push(`timestamp >= $${paramIndex++}`)
      queryParams.push(startDate)
    }

    if (endDate) {
      conditions.push(`timestamp <= $${paramIndex++}`)
      queryParams.push(endDate)
    }

    if (userId) {
      conditions.push(`user_id = $${paramIndex++}`)
      queryParams.push(userId)
    }

    // Construct WHERE clause if conditions exist
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : ""

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM audit_logs ${whereClause}`
    const countResult = await query(countQuery, queryParams)
    const total = Number.parseInt(countResult.rows[0].count)

    // Get paginated results
    const paginatedParams = [...queryParams, limit, offset]
    const selectQuery = `
      SELECT * FROM audit_logs 
      ${whereClause}
      ORDER BY timestamp DESC 
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `
    const result = await query(selectQuery, paginatedParams)

    const logs = result.rows.map((row: DbRow) => ({
      id: row.id,
      userId: row.user_id,
      eventType: row.event_type as AuditEventType,
      details: row.details,
      ipAddress: row.ip_address || undefined,
      userAgent: row.user_agent || undefined,
      timestamp: row.timestamp,
    }))

    return { logs, total }
  } catch (error) {
    console.error("Failed to retrieve system audit logs:", error)
    return { logs: [], total: 0 }
  }
}

