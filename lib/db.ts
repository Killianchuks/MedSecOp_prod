import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { createClient } from "@supabase/supabase-js"
import type { PostgrestError } from "@supabase/supabase-js"
import { createHash, randomBytes } from "crypto"
import { users, settings, cases, systemSettings } from "./db/schema"

// Initialize Neon SQL client
const sql = neon(process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || "")

// Create a Drizzle ORM instance
const db = drizzle(sql)

// Initialize Supabase clients
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

// Export the admin client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Function to hash a password using native crypto
function hashPassword(password: string, salt: string): string {
  return createHash("sha256")
    .update(password + salt)
    .digest("hex")
}

// Function to verify a password
function verifyPassword(password: string, hash: string, salt: string): boolean {
  return hashPassword(password, salt) === hash
}

// Function to generate a salt
function generateSalt(): string {
  return randomBytes(16).toString("hex")
}

// Function to check database connection
async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await sql`SELECT 1`
    return true
  } catch (error) {
    console.error("Database connection check failed:", error)
    return false
  }
}


export async function rawQuery<T = any>(text: string, params: any[] = []): Promise<T[]> {
  const result = await sql(text, params)
  return result as T[]
}

/**
 * Execute a database query with error handling
 * @param queryFn Function that performs the database query
 * @returns Result of the query or error
 */
export async function query<T>(
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
 * Execute multiple database operations in a transaction
 * @param operations Array of database operations to perform
 * @returns Result of the transaction
 */
export async function withTransaction<T>(
  operations: Array<() => Promise<{ data: any; error: PostgrestError | null }>>,
): Promise<{ data: T | null; error: Error | null }> {
  // Note: This is a simplified implementation since Supabase JS client doesn't directly
  // support transactions. In a real implementation, you would use RPC calls to
  // Postgres functions that handle transactions.

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

export { sql, db, checkDatabaseConnection, hashPassword, verifyPassword, generateSalt, users, settings, cases, systemSettings }

