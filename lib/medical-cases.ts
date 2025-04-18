import { withTransaction, query } from "./db"
import { logAuditEvent } from "./audit"
import { type User, UserRole } from "./auth"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase Admin client
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
)

// Case status enum
export enum CaseStatus {
  DRAFT = "draft",
  SUBMITTED = "submitted",
  ASSIGNED = "assigned",
  IN_REVIEW = "in_review",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

// Case priority enum
export enum CasePriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

// Medical case interface
export interface MedicalCase {
  id: string
  patientId: string
  doctorId?: string
  title: string
  description: string
  specialty: string
  status: CaseStatus
  priority: CasePriority
  paymentId?: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  medicalHistory?: Record<string, any>
  medications?: string[]
  allergies?: string[]
  symptoms?: string[]
  attachments?: string[]
  notes?: string
  reviewPackage?: string
  preferredLanguage?: string
  videoConsultation?: boolean
}

// Database row type that matches the database column names
interface MedicalCaseRow {
  id: string
  patient_id: string
  doctor_id?: string
  title: string
  description: string
  specialty: string
  status: CaseStatus
  priority: CasePriority
  payment_id?: string
  created_at: Date
  updated_at: Date
  completed_at?: Date
  medical_history?: Record<string, any>
  medications?: string[]
  allergies?: string[]
  symptoms?: string[]
  attachments?: string[]
  notes?: string
  review_package?: string
  preferred_language?: string
  video_consultation?: boolean
  [key: string]: any // Allow for additional properties
}

// Get all cases for a patient
export async function getPatientCases(patientId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from("cases")
      .select("*")
      .eq("patient_id", patientId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error fetching patient cases:", error)
    throw error
  }
}

// Get all cases for a doctor
export async function getDoctorCases(doctorId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from("cases")
      .select("*")
      .eq("doctor_id", doctorId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error fetching doctor cases:", error)
    throw error
  }
}

// Get a specific case by ID
export async function getCaseById(caseId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from("cases")
      .select("*, patient:patient_id(*), doctor:doctor_id(*)")
      .eq("id", caseId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error(`Error fetching case ${caseId}:`, error)
    throw error
  }
}

// Create a new case
export async function createCase(caseData: Partial<MedicalCaseRow>) {
  return withTransaction(async (client) => {
    try {
      // Insert the case
      const { data, error } = await supabaseAdmin.from("cases").insert(caseData).select().single()

      if (error) throw error

      // Log the case creation
      await client.query(
        "INSERT INTO audit_logs (user_id, action, resource_type, resource_id, details) VALUES ($1, $2, $3, $4, $5)",
        [caseData.patient_id, "create", "case", data.id, JSON.stringify(caseData)],
      )

      return data
    } catch (error) {
      console.error("Error creating case:", error)
      throw error
    }
  })
}

// Update a case
export async function updateCase(caseId: string, caseData: Partial<MedicalCaseRow>, userId: string) {
  return withTransaction(async (client) => {
    try {
      // Update the case
      const { data, error } = await supabaseAdmin.from("cases").update(caseData).eq("id", caseId).select().single()

      if (error) throw error

      // Log the case update
      await client.query(
        "INSERT INTO audit_logs (user_id, action, resource_type, resource_id, details) VALUES ($1, $2, $3, $4, $5)",
        [userId, "update", "case", caseId, JSON.stringify(caseData)],
      )

      return data
    } catch (error) {
      console.error(`Error updating case ${caseId}:`, error)
      throw error
    }
  })
}

// Delete a case (soft delete)
export async function deleteCase(caseId: string, userId: string) {
  return withTransaction(async (client) => {
    try {
      // Soft delete by updating the deleted_at field
      const { data, error } = await supabaseAdmin
        .from("cases")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", caseId)
        .select()
        .single()

      if (error) throw error

      // Log the case deletion
      await client.query(
        "INSERT INTO audit_logs (user_id, action, resource_type, resource_id, details) VALUES ($1, $2, $3, $4, $5)",
        [userId, "delete", "case", caseId, JSON.stringify({ deleted_at: new Date().toISOString() })],
      )

      return data
    } catch (error) {
      console.error(`Error deleting case ${caseId}:`, error)
      throw error
    }
  })
}

// Helper function to convert database row to MedicalCase interface
function rowToMedicalCase(row: MedicalCaseRow): MedicalCase {
  return {
    id: row.id,
    patientId: row.patient_id,
    doctorId: row.doctor_id,
    title: row.title,
    description: row.description,
    specialty: row.specialty,
    status: row.status,
    priority: row.priority,
    paymentId: row.payment_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    completedAt: row.completed_at,
    medicalHistory: row.medical_history,
    medications: row.medications,
    allergies: row.allergies,
    symptoms: row.symptoms,
    attachments: row.attachments,
    notes: row.notes,
    reviewPackage: row.review_package,
    preferredLanguage: row.preferred_language,
    videoConsultation: row.video_consultation,
  }
}

// Helper function to convert MedicalCase interface to database row format
function medicalCaseToRow(medicalCase: Partial<MedicalCase>): Partial<MedicalCaseRow> {
  const row: Partial<MedicalCaseRow> = {}

  if (medicalCase.patientId !== undefined) row.patient_id = medicalCase.patientId
  if (medicalCase.doctorId !== undefined) row.doctor_id = medicalCase.doctorId
  if (medicalCase.title !== undefined) row.title = medicalCase.title
  if (medicalCase.description !== undefined) row.description = medicalCase.description
  if (medicalCase.specialty !== undefined) row.specialty = medicalCase.specialty
  if (medicalCase.status !== undefined) row.status = medicalCase.status
  if (medicalCase.priority !== undefined) row.priority = medicalCase.priority
  if (medicalCase.paymentId !== undefined) row.payment_id = medicalCase.paymentId
  if (medicalCase.createdAt !== undefined) row.created_at = medicalCase.createdAt
  if (medicalCase.updatedAt !== undefined) row.updated_at = medicalCase.updatedAt
  if (medicalCase.completedAt !== undefined) row.completed_at = medicalCase.completedAt
  if (medicalCase.medicalHistory !== undefined) row.medical_history = medicalCase.medicalHistory
  if (medicalCase.medications !== undefined) row.medications = medicalCase.medications
  if (medicalCase.allergies !== undefined) row.allergies = medicalCase.allergies
  if (medicalCase.symptoms !== undefined) row.symptoms = medicalCase.symptoms
  if (medicalCase.attachments !== undefined) row.attachments = medicalCase.attachments
  if (medicalCase.notes !== undefined) row.notes = medicalCase.notes
  if (medicalCase.reviewPackage !== undefined) row.review_package = medicalCase.reviewPackage
  if (medicalCase.preferredLanguage !== undefined) row.preferred_language = medicalCase.preferredLanguage
  if (medicalCase.videoConsultation !== undefined) row.video_consultation = medicalCase.videoConsultation

  return row
}

// Create a new medical case
export async function createMedicalCase(
  caseData: Partial<MedicalCase>,
  userId: string,
): Promise<{ case: MedicalCase | null; error: string | null }> {
  try {
    return await withTransaction(async (client) => {
      // Convert to database row format
      const rowData = medicalCaseToRow(caseData)
      rowData.patient_id = userId // Set the patient ID to the user ID

      // Insert the case
      const result = await client.query(
        `INSERT INTO medical_cases (
          patient_id, title, description, specialty, status, priority, 
          payment_id, medical_history, medications, allergies, symptoms, 
          notes, review_package, preferred_language, video_consultation
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
        RETURNING *`,
        [
          rowData.patient_id,
          rowData.title,
          rowData.description,
          rowData.specialty,
          rowData.status || CaseStatus.DRAFT,
          rowData.priority || CasePriority.MEDIUM,
          rowData.payment_id,
          rowData.medical_history || {},
          rowData.medications || [],
          rowData.allergies || [],
          rowData.symptoms || [],
          rowData.notes,
          rowData.review_package,
          rowData.preferred_language,
          rowData.video_consultation || false,
        ],
      )

      const newCase = result.rows[0]

      // Log case creation
      await logAuditEvent(userId, "case_created", {
        case_id: newCase.id,
        status: newCase.status,
      })

      return {
        case: rowToMedicalCase(newCase),
        error: null,
      }
    })
  } catch (error: any) {
    console.error("Case creation error:", error)
    return { case: null, error: error.message || "Failed to create case" }
  }
}

// Update a medical case
export async function updateMedicalCase(
  caseId: string,
  updates: Partial<MedicalCase>,
  user: User,
): Promise<{ success: boolean; error: string | null }> {
  try {
    return await withTransaction(async (client) => {
      // First, check if the user has permission to update this case
      const caseResult = await client.query("SELECT * FROM medical_cases WHERE id = $1", [caseId])

      if (caseResult.rows.length === 0) {
        return { success: false, error: "Case not found" }
      }

      const existingCase = caseResult.rows[0]

      // Check permissions
      const canUpdate =
        user.role === UserRole.ADMIN ||
        (user.role === UserRole.PATIENT && existingCase.patient_id === user.id) ||
        (user.role === UserRole.DOCTOR && existingCase.doctor_id === user.id)

      if (!canUpdate) {
        return { success: false, error: "Insufficient permissions to update this case" }
      }

      // Convert to database row format
      const rowUpdates = medicalCaseToRow(updates)

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
      addUpdateField("title", rowUpdates.title)
      addUpdateField("description", rowUpdates.description)
      addUpdateField("specialty", rowUpdates.specialty)
      addUpdateField("status", rowUpdates.status)
      addUpdateField("priority", rowUpdates.priority)
      addUpdateField("doctor_id", rowUpdates.doctor_id)
      addUpdateField("payment_id", rowUpdates.payment_id)
      addUpdateField("medical_history", rowUpdates.medical_history)
      addUpdateField("medications", rowUpdates.medications)
      addUpdateField("allergies", rowUpdates.allergies)
      addUpdateField("symptoms", rowUpdates.symptoms)
      addUpdateField("notes", rowUpdates.notes)
      addUpdateField("review_package", rowUpdates.review_package)
      addUpdateField("preferred_language", rowUpdates.preferred_language)
      addUpdateField("video_consultation", rowUpdates.video_consultation)

      // Add completed_at if status is being set to COMPLETED
      if (updates.status === CaseStatus.COMPLETED && existingCase.status !== CaseStatus.COMPLETED) {
        addUpdateField("completed_at", new Date())
      }

      // Always update the updated_at timestamp
      addUpdateField("updated_at", new Date())

      // If no fields to update, return success
      if (updateFields.length === 0) {
        return { success: true, error: null }
      }

      // Execute the update
      const updateQuery = `
        UPDATE medical_cases 
        SET ${updateFields.join(", ")} 
        WHERE id = $${paramIndex}
      `
      queryParams.push(caseId)

      await client.query(updateQuery, queryParams)

      // Log the update
      await logAuditEvent(user.id, "case_updated", {
        case_id: caseId,
        updated_fields: Object.keys(updates),
        previous_status: existingCase.status,
        new_status: updates.status || existingCase.status,
      })

      return { success: true, error: null }
    })
  } catch (error: any) {
    console.error("Case update error:", error)
    return { success: false, error: error.message || "Failed to update case" }
  }
}

// Get a medical case by ID
export async function getMedicalCase(
  caseId: string,
  user: User,
): Promise<{ case: MedicalCase | null; error: string | null }> {
  try {
    const result = await query("SELECT * FROM medical_cases WHERE id = $1", [caseId])

    if (result.rows.length === 0) {
      return { case: null, error: "Case not found" }
    }

    const medicalCase = result.rows[0]

    // Check permissions
    const canView =
      user.role === UserRole.ADMIN ||
      (user.role === UserRole.PATIENT && medicalCase.patient_id === user.id) ||
      (user.role === UserRole.DOCTOR && medicalCase.doctor_id === user.id)

    if (!canView) {
      return { case: null, error: "Insufficient permissions to view this case" }
    }

    // Log the access
    await logAuditEvent(user.id, "case_accessed", {
      case_id: caseId,
    })

    return {
      case: rowToMedicalCase(medicalCase),
      error: null,
    }
  } catch (error: any) {
    console.error("Case retrieval error:", error)
    return { case: null, error: error.message || "Failed to retrieve case" }
  }
}

// Get medical cases for a user
export async function getUserMedicalCases(
  user: User,
  status?: CaseStatus,
  limit = 10,
  offset = 0,
): Promise<{ cases: MedicalCase[]; total: number; error: string | null }> {
  try {
    let whereClause = ""
    const queryParams: any[] = []

    // Build the where clause based on user role
    if (user.role === UserRole.PATIENT) {
      whereClause = "WHERE patient_id = $1"
      queryParams.push(user.id)
    } else if (user.role === UserRole.DOCTOR) {
      whereClause = "WHERE doctor_id = $1"
      queryParams.push(user.id)
    }

    // Add status filter if provided
    if (status) {
      if (whereClause) {
        whereClause += " AND status = $" + (queryParams.length + 1)
      } else {
        whereClause = "WHERE status = $1"
      }
      queryParams.push(status)
    }

    // Get total count
    const countResult = await query(`SELECT COUNT(*) FROM medical_cases ${whereClause}`, queryParams)

    const total = Number.parseInt(countResult.rows[0].count)

    // Get paginated results
    const paginatedParams = [...queryParams, limit, offset]
    const result = await query(
      `SELECT * FROM medical_cases ${whereClause} 
       ORDER BY updated_at DESC 
       LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`,
      paginatedParams,
    )

    // Map the results to our interface
    const cases = result.rows.map(rowToMedicalCase)

    return { cases, total, error: null }
  } catch (error: any) {
    console.error("Cases retrieval error:", error)
    return { cases: [], total: 0, error: error.message || "Failed to retrieve cases" }
  }
}

// Assign a doctor to a case
export async function assignDoctorToCase(
  caseId: string,
  doctorId: string,
  adminId: string,
): Promise<{ success: boolean; error: string | null }> {
  try {
    return await withTransaction(async (client) => {
      // Check if the case exists
      const caseResult = await client.query("SELECT * FROM medical_cases WHERE id = $1", [caseId])

      if (caseResult.rows.length === 0) {
        return { success: false, error: "Case not found" }
      }

      const medicalCase = caseResult.rows[0]

      // Check if the doctor exists and is active
      const doctorResult = await client.query(
        `SELECT * FROM user_profiles 
         WHERE id = $1 AND role = $2 AND is_active = true`,
        [doctorId, UserRole.DOCTOR],
      )

      if (doctorResult.rows.length === 0) {
        return { success: false, error: "Doctor not found or inactive" }
      }

      // Update the case
      await client.query(
        `UPDATE medical_cases 
         SET doctor_id = $1, status = $2, updated_at = NOW() 
         WHERE id = $3`,
        [doctorId, CaseStatus.ASSIGNED, caseId],
      )

      // Log the assignment
      await logAuditEvent(adminId, "case_doctor_assigned", {
        case_id: caseId,
        doctor_id: doctorId,
        previous_status: medicalCase.status,
      })

      // Notify the doctor and patient
      await client.query(
        `INSERT INTO notifications (
          user_id, type, title, message, related_id, related_type
        ) VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          doctorId,
          "case_assigned",
          "New Case Assigned",
          `You have been assigned to case #${caseId}`,
          caseId,
          "medical_case",
        ],
      )

      await client.query(
        `INSERT INTO notifications (
          user_id, type, title, message, related_id, related_type
        ) VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          medicalCase.patient_id,
          "case_update",
          "Case Update",
          `A doctor has been assigned to your case #${caseId}`,
          caseId,
          "medical_case",
        ],
      )

      return { success: true, error: null }
    })
  } catch (error: any) {
    console.error("Doctor assignment error:", error)
    return { success: false, error: error.message || "Failed to assign doctor" }
  }
}

