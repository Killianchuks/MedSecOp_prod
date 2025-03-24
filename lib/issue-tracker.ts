import { query, withTransaction } from "./db"
import type { User } from "./auth"
import { logAuditEvent } from "./audit"

// Issue priority enum
export enum IssuePriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

// Issue status enum
export enum IssueStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  RESOLVED = "resolved",
  CLOSED = "closed",
}

// Issue type enum
export enum IssueType {
  BUG = "bug",
  FEATURE = "feature",
  IMPROVEMENT = "improvement",
  SECURITY = "security",
  PERFORMANCE = "performance",
}

// Issue interface
export interface Issue {
  id: string
  title: string
  description: string
  type: IssueType
  status: IssueStatus
  priority: IssuePriority
  reportedBy: string
  assignedTo?: string
  component?: string
  affectedPages?: string[]
  stepsToReproduce?: string[]
  expectedBehavior?: string
  actualBehavior?: string
  browserInfo?: string
  deviceInfo?: string
  screenshots?: string[]
  createdAt: Date
  updatedAt: Date
  resolvedAt?: Date
}

// Create a new issue
export async function createIssue(
  issueData: Partial<Issue>,
  user: User,
): Promise<{ issue: Issue | null; error: string | null }> {
  try {
    return await withTransaction(async (client) => {
      // Insert the issue
      const result = await client.query(
        `INSERT INTO issues (
          title, description, type, status, priority, reported_by,
          assigned_to, component, affected_pages, steps_to_reproduce,
          expected_behavior, actual_behavior, browser_info, device_info, screenshots
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
        RETURNING *`,
        [
          issueData.title,
          issueData.description,
          issueData.type || IssueType.BUG,
          issueData.status || IssueStatus.OPEN,
          issueData.priority || IssuePriority.MEDIUM,
          user.id,
          issueData.assignedTo,
          issueData.component,
          issueData.affectedPages || [],
          issueData.stepsToReproduce || [],
          issueData.expectedBehavior,
          issueData.actualBehavior,
          issueData.browserInfo,
          issueData.deviceInfo,
          issueData.screenshots || [],
        ],
      )

      const newIssue = result.rows[0]

      // Log issue creation
      await logAuditEvent(user.id, "issue_created", {
        issue_id: newIssue.id,
        title: newIssue.title,
        type: newIssue.type,
        priority: newIssue.priority,
      })

      return {
        issue: {
          id: newIssue.id,
          title: newIssue.title,
          description: newIssue.description,
          type: newIssue.type,
          status: newIssue.status,
          priority: newIssue.priority,
          reportedBy: newIssue.reported_by,
          assignedTo: newIssue.assigned_to,
          component: newIssue.component,
          affectedPages: newIssue.affected_pages,
          stepsToReproduce: newIssue.steps_to_reproduce,
          expectedBehavior: newIssue.expected_behavior,
          actualBehavior: newIssue.actual_behavior,
          browserInfo: newIssue.browser_info,
          deviceInfo: newIssue.device_info,
          screenshots: newIssue.screenshots,
          createdAt: newIssue.created_at,
          updatedAt: newIssue.updated_at,
          resolvedAt: newIssue.resolved_at,
        },
        error: null,
      }
    })
  } catch (error: any) {
    console.error("Issue creation error:", error)
    return { issue: null, error: error.message || "Failed to create issue" }
  }
}

// Get issues
export async function getIssues(
  filters: {
    status?: IssueStatus
    priority?: IssuePriority
    type?: IssueType
    component?: string
    reportedBy?: string
    assignedTo?: string
  } = {},
  limit = 20,
  offset = 0,
): Promise<{ issues: Issue[]; total: number; error: string | null }> {
  try {
    // Build the where clause based on filters
    let whereClause = ""
    const queryParams: any[] = []
    let paramIndex = 1

    if (Object.keys(filters).length > 0) {
      whereClause = "WHERE "
      const conditions: string[] = []

      if (filters.status) {
        conditions.push(`status = $${paramIndex++}`)
        queryParams.push(filters.status)
      }

      if (filters.priority) {
        conditions.push(`priority = $${paramIndex++}`)
        queryParams.push(filters.priority)
      }

      if (filters.type) {
        conditions.push(`type = $${paramIndex++}`)
        queryParams.push(filters.type)
      }

      if (filters.component) {
        conditions.push(`component = $${paramIndex++}`)
        queryParams.push(filters.component)
      }

      if (filters.reportedBy) {
        conditions.push(`reported_by = $${paramIndex++}`)
        queryParams.push(filters.reportedBy)
      }

      if (filters.assignedTo) {
        conditions.push(`assigned_to = $${paramIndex++}`)
        queryParams.push(filters.assignedTo)
      }

      whereClause += conditions.join(" AND ")
    }

    // Get total count
    const countResult = await query(`SELECT COUNT(*) FROM issues ${whereClause}`, queryParams)

    const total = Number.parseInt(countResult.rows[0].count)

    // Get paginated results
    const paginatedParams = [...queryParams, limit, offset]
    const result = await query(
      `SELECT * FROM issues ${whereClause} 
       ORDER BY 
         CASE WHEN status = 'open' THEN 1
              WHEN status = 'in_progress' THEN 2
              WHEN status = 'resolved' THEN 3
              WHEN status = 'closed' THEN 4
              ELSE 5
         END,
         CASE WHEN priority = 'critical' THEN 1
              WHEN priority = 'high' THEN 2
              WHEN priority = 'medium' THEN 3
              WHEN priority = 'low' THEN 4
              ELSE 5
         END,
         created_at DESC
       LIMIT $${paramIndex++} OFFSET $${paramIndex}`,
      paginatedParams,
    )

    const issues = result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      type: row.type,
      status: row.status,
      priority: row.priority,
      reportedBy: row.reported_by,
      assignedTo: row.assigned_to,
      component: row.component,
      affectedPages: row.affected_pages,
      stepsToReproduce: row.steps_to_reproduce,
      expectedBehavior: row.expected_behavior,
      actualBehavior: row.actual_behavior,
      browserInfo: row.browser_info,
      deviceInfo: row.device_info,
      screenshots: row.screenshots,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      resolvedAt: row.resolved_at,
    }))

    return { issues, total, error: null }
  } catch (error: any) {
    console.error("Issues retrieval error:", error)
    return { issues: [], total: 0, error: error.message || "Failed to retrieve issues" }
  }
}

// Update an issue
export async function updateIssue(
  issueId: string,
  updates: Partial<Issue>,
  user: User,
): Promise<{ success: boolean; error: string | null }> {
  try {
    return await withTransaction(async (client) => {
      // Get the current issue
      const issueResult = await client.query("SELECT * FROM issues WHERE id = $1", [issueId])

      if (issueResult.rows.length === 0) {
        return { success: false, error: "Issue not found" }
      }

      const existingIssue = issueResult.rows[0]

      // Build the update query dynamically based on provided fields
      const updateFields: string[] = []
      const queryParams: any[] = []
      let paramIndex = 1

      // Helper to add a field to the update
      const addUpdateField = (fieldName: string, value: any) => {
        if (value !== undefined) {
          updateFields.push(`${fieldName} = $${paramIndex}`)
          queryParams.push(value)
          paramIndex++
        }
      }

      // Add all possible update fields
      addUpdateField("title", updates.title)
      addUpdateField("description", updates.description)
      addUpdateField("type", updates.type)
      addUpdateField("status", updates.status)
      addUpdateField("priority", updates.priority)
      addUpdateField("assigned_to", updates.assignedTo)
      addUpdateField("component", updates.component)
      addUpdateField("affected_pages", updates.affectedPages)
      addUpdateField("steps_to_reproduce", updates.stepsToReproduce)
      addUpdateField("expected_behavior", updates.expectedBehavior)
      addUpdateField("actual_behavior", updates.actualBehavior)
      addUpdateField("browser_info", updates.browserInfo)
      addUpdateField("device_info", updates.deviceInfo)
      addUpdateField("screenshots", updates.screenshots)

      // If status is changing to resolved, set resolved_at
      if (updates.status === IssueStatus.RESOLVED && existingIssue.status !== IssueStatus.RESOLVED) {
        addUpdateField("resolved_at", new Date())
      }

      // Always update updated_at
      addUpdateField("updated_at", new Date())

      // If no fields to update, return success
      if (updateFields.length === 0) {
        return { success: true, error: null }
      }

      // Execute the update
      const updateQuery = `
        UPDATE issues 
        SET ${updateFields.join(", ")} 
        WHERE id = $${paramIndex}
      `
      queryParams.push(issueId)

      await client.query(updateQuery, queryParams)

      // Log the update
      await logAuditEvent(user.id, "issue_updated", {
        issue_id: issueId,
        updated_fields: Object.keys(updates),
        previous_status: existingIssue.status,
        new_status: updates.status || existingIssue.status,
      })

      return { success: true, error: null }
    })
  } catch (error: any) {
    console.error("Issue update error:", error)
    return { success: false, error: error.message || "Failed to update issue" }
  }
}

