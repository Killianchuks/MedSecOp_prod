import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"
import { withTransaction, query } from "./db"
import { logAuditEvent } from "./audit"
import { type User, UserRole } from "./auth"
import * as crypto from "crypto"

// Initialize Supabase client for storage
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Image status enum
export enum ImageStatus {
  PENDING = "pending",
  UPLOADED = "uploaded",
  PROCESSING = "processing",
  READY = "ready",
  ERROR = "error",
}

// Image request interface
export interface ImageRequest {
  id: string
  patientId: string
  caseId?: string
  facilityName: string
  facilityEmail: string
  facilityPhone?: string
  imageType: string
  studyDate?: string
  notes?: string
  status: ImageStatus
  secureUploadToken?: string
  tokenExpiry?: Date
  createdAt: Date
  updatedAt: Date
}

// Medical image interface
export interface MedicalImage {
  id: string
  requestId: string
  patientId: string
  caseId?: string
  fileName: string
  fileType: string
  fileSize: number
  storageUrl: string
  thumbnailUrl?: string
  metadata?: Record<string, any>
  uploadedAt: Date
  status: ImageStatus
}

// Create a new image request
export async function createImageRequest(
  requestData: Partial<ImageRequest>,
  userId: string,
): Promise<{ request: ImageRequest | null; error: string | null }> {
  try {
    return await withTransaction(async (client) => {
      // Generate a secure upload token
      const token = crypto.randomBytes(32).toString("hex")
      const tokenExpiry = new Date()
      tokenExpiry.setDate(tokenExpiry.getDate() + 7) // Token valid for 7 days

      // Insert the request
      const result = await client.query(
        `INSERT INTO image_requests (
          patient_id, case_id, facility_name, facility_email, facility_phone,
          image_type, study_date, notes, status, secure_upload_token, token_expiry
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING *`,
        [
          userId,
          requestData.caseId,
          requestData.facilityName,
          requestData.facilityEmail,
          requestData.facilityPhone,
          requestData.imageType,
          requestData.studyDate,
          requestData.notes,
          ImageStatus.PENDING,
          token,
          tokenExpiry,
        ],
      )

      const newRequest = result.rows[0]

      // Log request creation
      await logAuditEvent(userId, "image_request_created", {
        request_id: newRequest.id,
        facility: newRequest.facility_name,
      })

      return {
        request: {
          id: newRequest.id,
          patientId: newRequest.patient_id,
          caseId: newRequest.case_id,
          facilityName: newRequest.facility_name,
          facilityEmail: newRequest.facility_email,
          facilityPhone: newRequest.facility_phone,
          imageType: newRequest.image_type,
          studyDate: newRequest.study_date,
          notes: newRequest.notes,
          status: newRequest.status,
          secureUploadToken: newRequest.secure_upload_token,
          tokenExpiry: newRequest.token_expiry,
          createdAt: newRequest.created_at,
          updatedAt: newRequest.updated_at,
        },
        error: null,
      }
    })
  } catch (error: any) {
    console.error("Image request creation error:", error)
    return { request: null, error: error.message || "Failed to create image request" }
  }
}

// Validate an upload token
export async function validateUploadToken(
  token: string,
): Promise<{ requestId: string | null; patientId: string | null; error: string | null }> {
  try {
    const result = await query(
      `SELECT id, patient_id FROM image_requests 
       WHERE secure_upload_token = $1 AND token_expiry > NOW()`,
      [token],
    )

    if (result.rows.length === 0) {
      return { requestId: null, patientId: null, error: "Invalid or expired token" }
    }

    return {
      requestId: result.rows[0].id,
      patientId: result.rows[0].patient_id,
      error: null,
    }
  } catch (error: any) {
    console.error("Token validation error:", error)
    return { requestId: null, patientId: null, error: error.message || "Failed to validate token" }
  }
}

// Upload a medical image
export async function uploadMedicalImage(
  file: File,
  requestId: string,
  patientId: string,
  caseId?: string,
): Promise<{ image: MedicalImage | null; error: string | null }> {
  try {
    // Generate a unique file name
    const fileExtension = file.name.split(".").pop()
    const uniqueFileName = `${uuidv4()}.${fileExtension}`
    const storagePath = `medical-images/${patientId}/${uniqueFileName}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage.from("secure-medical-files").upload(storagePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    })

    if (error) {
      throw new Error(error.message)
    }

    // Get the public URL
    const { data: urlData } = supabase.storage.from("secure-medical-files").getPublicUrl(storagePath)

    // Create a thumbnail for supported image types
    let thumbnailUrl = undefined
    if (file.type.startsWith("image/")) {
      const thumbnailPath = `thumbnails/${patientId}/${uniqueFileName}`
      // This would typically involve image processing
      // For simplicity, we're skipping the actual thumbnail generation
      thumbnailUrl = urlData.publicUrl
    }

    return await withTransaction(async (client) => {
      // Update the request status
      await client.query(`UPDATE image_requests SET status = $1, updated_at = NOW() WHERE id = $2`, [
        ImageStatus.UPLOADED,
        requestId,
      ])

      // Insert the image record
      const result = await client.query(
        `INSERT INTO medical_images (
          request_id, patient_id, case_id, file_name, file_type, file_size,
          storage_url, thumbnail_url, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *`,
        [
          requestId,
          patientId,
          caseId,
          file.name,
          file.type,
          file.size,
          urlData.publicUrl,
          thumbnailUrl,
          ImageStatus.READY,
        ],
      )

      const newImage = result.rows[0]

      // Log image upload
      await logAuditEvent(patientId, "medical_image_uploaded", {
        image_id: newImage.id,
        request_id: requestId,
        file_name: file.name,
        file_size: file.size,
      })

      return {
        image: {
          id: newImage.id,
          requestId: newImage.request_id,
          patientId: newImage.patient_id,
          caseId: newImage.case_id,
          fileName: newImage.file_name,
          fileType: newImage.file_type,
          fileSize: newImage.file_size,
          storageUrl: newImage.storage_url,
          thumbnailUrl: newImage.thumbnail_url,
          metadata: newImage.metadata,
          uploadedAt: newImage.uploaded_at,
          status: newImage.status,
        },
        error: null,
      }
    })
  } catch (error: any) {
    console.error("Image upload error:", error)
    return { image: null, error: error.message || "Failed to upload image" }
  }
}

// Get medical images for a patient
export async function getPatientMedicalImages(
  patientId: string,
  caseId?: string,
): Promise<{ images: MedicalImage[]; error: string | null }> {
  try {
    let whereClause = "WHERE patient_id = $1"
    const queryParams: any[] = [patientId]

    if (caseId) {
      whereClause += " AND case_id = $2"
      queryParams.push(caseId)
    }

    const result = await query(`SELECT * FROM medical_images ${whereClause} ORDER BY uploaded_at DESC`, queryParams)

    const images = result.rows.map((row) => ({
      id: row.id,
      requestId: row.request_id,
      patientId: row.patient_id,
      caseId: row.case_id,
      fileName: row.file_name,
      fileType: row.file_type,
      fileSize: row.file_size,
      storageUrl: row.storage_url,
      thumbnailUrl: row.thumbnail_url,
      metadata: row.metadata,
      uploadedAt: row.uploaded_at,
      status: row.status,
    }))

    return { images, error: null }
  } catch (error: any) {
    console.error("Image retrieval error:", error)
    return { images: [], error: error.message || "Failed to retrieve images" }
  }
}

// Delete a medical image
export async function deleteMedicalImage(
  imageId: string,
  user: User,
): Promise<{ success: boolean; error: string | null }> {
  try {
    return await withTransaction(async (client) => {
      // Get the image record
      const imageResult = await client.query("SELECT * FROM medical_images WHERE id = $1", [imageId])

      if (imageResult.rows.length === 0) {
        return { success: false, error: "Image not found" }
      }

      const image = imageResult.rows[0]

      // Check permissions
      const canDelete = user.role === UserRole.ADMIN || (user.role === UserRole.PATIENT && image.patient_id === user.id)

      if (!canDelete) {
        return { success: false, error: "Insufficient permissions to delete this image" }
      }

      // Delete from storage
      const storagePath = image.storage_url.split("/").pop()
      if (storagePath) {
        const { error } = await supabase.storage
          .from("secure-medical-files")
          .remove([`medical-images/${image.patient_id}/${storagePath}`])

        if (error) {
          console.error("Storage deletion error:", error)
          // Continue with database deletion even if storage deletion fails
        }
      }

      // Delete from database
      await client.query("DELETE FROM medical_images WHERE id = $1", [imageId])

      // Log the deletion
      await logAuditEvent(user.id, "medical_image_deleted", {
        image_id: imageId,
        file_name: image.file_name,
      })

      return { success: true, error: null }
    })
  } catch (error: any) {
    console.error("Image deletion error:", error)
    return { success: false, error: error.message || "Failed to delete image" }
  }
}

