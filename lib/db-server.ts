"use server"

import { createClient } from "@supabase/supabase-js"
import type { PostgrestError } from "@supabase/supabase-js"
import { Pool } from "@neondatabase/serverless"

// Initialize Supabase client for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

// Create Supabase admin client (server-side only)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Initialize Neon database connection
const neonConnectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || ""
const pool = neonConnectionString ? new Pool({ connectionString: neonConnectionString }) : null

/**
 * Execute a raw SQL query using Neon database
 * @param text SQL query text
 * @param params Query parameters
 * @returns Query result
 */
export async function executeQuery(text: string, params: any[] = []) {
  if (!pool) {
    console.error("Database connection not available")
    return { rows: [], error: new Error("Database connection not available") }
  }

  try {
    const result = await pool.query(text, params)
    return { rows: result.rows, error: null }
  } catch (error) {
    console.error("Database query error:", error)
    return {
      rows: [],
      error: error instanceof Error ? error : new Error("Unknown database error"),
    }
  }
}

/**
 * Execute a database query with error handling (server-side)
 * @param queryFn Function that performs the database query
 * @returns Result of the query or error
 */
export async function serverQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: PostgrestError | null }>,
): Promise<{ data: T | null; error: Error | null }> {
  try {
    const result = await queryFn()
    if (result.error) {
      console.error("Database query error:", result.error)
      return { data: null, error: new Error(result.error.message) }
    }
    return { data: result.data, error: null }
  } catch (error) {
    console.error("Unexpected database error:", error)
    return {
      data: null,
      error: error instanceof Error ? error : new Error("Unknown database error"),
    }
  }
}

/**
 * Execute multiple database operations in a transaction (server-side)
 * @param operations Array of database operations to perform
 * @returns Result of the transaction
 */
export async function serverWithTransaction<T>(
  operations: Array<() => Promise<{ data: any; error: PostgrestError | null }>>,
): Promise<{ data: T | null; error: Error | null }> {
  const results: any[] = []
  let hasError = false
  let firstError: Error | null = null

  for (const operation of operations) {
    if (hasError) break

    try {
      const result = await operation()
      if (result.error) {
        hasError = true
        firstError = new Error(result.error.message)
        break
      }
      results.push(result.data)
    } catch (error) {
      hasError = true
      firstError = error instanceof Error ? error : new Error("Unknown transaction error")
      break
    }
  }

  if (hasError) {
    return { data: null, error: firstError }
  }

  return { data: results as T, error: null }
}

/**
 * Check if the database connection is working (server-side)
 * @returns True if connection is successful, false otherwise
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  // First try Neon connection
  if (pool) {
    try {
      await pool.query("SELECT 1")
      return true
    } catch (error) {
      console.error("Neon database connection check failed:", error)
    }
  }

  // Fall back to Supabase
  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Database connections not configured")
    return false
  }

  try {
    // Simple query to check if the database is accessible
    const { error } = await supabaseAdmin.from("health_check").select("id").limit(1).single()

    // If the table doesn't exist, we'll get an error, but the connection is still working
    if (error && error.code !== "42P01") {
      // 42P01 is the Postgres error code for "table does not exist"
      console.error("Database connection check failed:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Database connection check failed with exception:", error)
    return false
  }
}

// Export the admin client for server-side operations
export { supabaseAdmin }

