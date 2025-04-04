import { Pool, type PoolClient } from "pg"
import { createClient } from "@supabase/supabase-js"
import * as crypto from "crypto" // Use Node.js built-in crypto instead of bcrypt

// Create a database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Initialize Supabase Admin client
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
)

// Query function for executing SQL queries
export async function query(text: string, params: any[] = []) {
  const start = Date.now()
  try {
    const result = await pool.query(text, params)
    const duration = Date.now() - start
    console.log("Executed query", { text, duration, rows: result.rowCount })
    return result
  } catch (error) {
    console.error("Query error", { text, error })
    throw error
  }
}

// Transaction helper function
export async function withTransaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    const result = await callback(client)
    await client.query("COMMIT")
    return result
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}

// Check database connection
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await pool.query("SELECT NOW()")
    return true
  } catch (error) {
    console.error("Database connection check failed:", error)
    return false
  }
}

// SQL tagged template literal for safer SQL queries
export const sql = Object.assign(
  // Main function for tagged template literals
  async (strings: TemplateStringsArray, ...values: any[]) => {
    const { text, values: params } = sqlRaw(strings, ...values)
    return query(text, params)
  },
  {
    // Direct query method
    query,
    // Raw SQL helper
    raw: sqlRaw,
  },
)

// Helper function to convert template strings to parameterized query
function sqlRaw(strings: TemplateStringsArray, ...values: any[]) {
  let text = strings[0]
  const params = []

  for (let i = 0; i < values.length; i++) {
    params.push(values[i])
    text += `$${params.length}${strings[i + 1]}`
  }

  return { text, values: params }
}

// Re-export the PoolClient type for convenience
export type { PoolClient }

// Function to verify a password against a hash using Node.js crypto
export const verifyPassword = (password: string, storedHash: string, salt: string): boolean => {
  // Create a hash of the password + salt using the same algorithm used to create the stored hash
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")

  // Compare the generated hash with the stored hash
  return storedHash === hash
}

// Function to hash a password
export const hashPassword = (password: string): { hash: string; salt: string } => {
  // Generate a random salt
  const salt = crypto.randomBytes(16).toString("hex")

  // Hash the password with the salt
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")

  return { hash, salt }
}

