'use server';

import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Add any other connection options here
});

/**
 * Execute a database query
 */
export async function query(text, params = []) {
  try {
    const result = await pool.query(text, params);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Database query error:', error);
    return { success: false, error: error.message };
  }
}

// Keep any other existing functions from your original file