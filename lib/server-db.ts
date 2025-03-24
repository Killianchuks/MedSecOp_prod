"use server"

import { Pool } from "@neondatabase/serverless"

// Initialize Neon database connection
const neonConnectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || ""
const pool = neonConnectionString ? new Pool({ connectionString: neonConnectionString }) : null

// Function to execute a query with parameters
export async function query(text: string, params: any[] = []) {
  if (!pool) {
    console.error("Database connection not available")
    throw new Error("Database connection not available")
  }

  const start = Date.now()
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start

    // Log slow queries in production for optimization
    if (duration > 100 && process.env.NODE_ENV === "production") {
      console.log("Slow query:", { text, duration, rows: res.rowCount })
    }

    return res
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Transaction helper
export async function withTransaction<T>(callback: (client: Pool) => Promise<T>): Promise<T> {
  if (!pool) {
    throw new Error("Database connection not available")
  }

  try {
    await pool.query("BEGIN")
    const result = await callback(pool)
    await pool.query("COMMIT")
    return result
  } catch (error) {
    await pool.query("ROLLBACK")
    throw error
  }
}

// PostgreSQL-specific health check
export async function checkPostgresConnection() {
  if (!pool) {
    return false
  }

  try {
    await pool.query("SELECT 1")
    return true
  } catch (error) {
    console.error("PostgreSQL connection error:", error)
    return false
  }
}

// Function to get a database client (for compatibility with existing code)
export async function getDbClient() {
  if (!pool) {
    throw new Error("Database connection not available")
  }
  return pool
}

/**
 * Create database tables if they don't exist
 */
export async function initializeDatabase() {
  if (!pool) {
    return { success: false, error: "Database connection not available" }
  }

  try {
    // Create health_check table for system monitoring
    await pool.query(`
      CREATE TABLE IF NOT EXISTS health_check (
        id SERIAL PRIMARY KEY,
        service VARCHAR(100) NOT NULL,
        status VARCHAR(20) NOT NULL,
        last_checked TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        details JSONB
      )
    `)

    // Insert a test record
    await pool.query(`
      INSERT INTO health_check (service, status, details)
      VALUES ('database', 'operational', '{"message": "Database initialized successfully"}')
      ON CONFLICT DO NOTHING
    `)

    return { success: true, error: null }
  } catch (error) {
    console.error("Failed to initialize database:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error initializing database",
    }
  }
}

