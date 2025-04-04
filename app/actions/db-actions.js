'use server';

import { Pool } from 'pg';

// Create a connection pool (this only runs on the server)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

/**
 * Execute a database query
 * @param {string} text - SQL query text
 * @param {Array} params - Query parameters
 * @returns {Promise<Object>} Query result
 */
async function executeQuery(text, params = []) {
  try {
    const result = await pool.query(text, params);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Database query error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get a single record by ID
 * @param {string} table - Table name
 * @param {number|string} id - Record ID
 * @returns {Promise<Object>} Query result
 */
export async function getById(table, id) {
  return executeQuery(`SELECT * FROM ${table} WHERE id = $1`, [id]);
}

/**
 * Get all records from a table
 * @param {string} table - Table name
 * @param {number} limit - Maximum number of records to return
 * @param {number} offset - Number of records to skip
 * @returns {Promise<Object>} Query result
 */
export async function getAll(table, limit = 100, offset = 0) {
  return executeQuery(
    `SELECT * FROM ${table} ORDER BY id DESC LIMIT $1 OFFSET $2`, 
    [limit, offset]
  );
}

/**
 * Create a new record
 * @param {string} table - Table name
 * @param {Object} data - Record data
 * @returns {Promise<Object>} Query result
 */
export async function create(table, data) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
  const columns = keys.join(', ');
  
  const query = `
    INSERT INTO ${table} (${columns}) 
    VALUES (${placeholders})
    RETURNING *
  `;
  
  return executeQuery(query, values);
}

/**
 * Update an existing record
 * @param {string} table - Table name
 * @param {number|string} id - Record ID
 * @param {Object} data - Record data
 * @returns {Promise<Object>} Query result
 */
export async function update(table, id, data) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  
  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
  
  const query = `
    UPDATE ${table}
    SET ${setClause}
    WHERE id = $${keys.length + 1}
    RETURNING *
  `;
  
  return executeQuery(query, [...values, id]);
}

/**
 * Delete a record
 * @param {string} table - Table name
 * @param {number|string} id - Record ID
 * @returns {Promise<Object>} Query result
 */
export async function remove(table, id) {
  return executeQuery(`DELETE FROM ${table} WHERE id = $1 RETURNING *`, [id]);
}

/**
 * Execute a custom SQL query
 * @param {string} sql - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise<Object>} Query result
 */
export async function query(sql, params = []) {
  return executeQuery(sql, params);
}

/**
 * SQL template literal tag for creating SQL queries
 * This is now an async function to comply with Server Actions requirements
 * @param {Array} strings - Template strings
 * @param {...any} values - Template values
 * @returns {Promise<Object>} SQL query object
 */
export async function sql(strings, ...values) {
  const text = strings.reduce((result, str, i) => 
    result + str + (i < values.length ? `$${i + 1}` : ''), '');
  
  // Return a promise to make this an async function
  return Promise.resolve({
    text,
    values,
    execute: async () => {
      return executeQuery(text, values);
    }
  });
}

/**
 * Execute a function within a transaction
 * @param {Function} callback - Function to execute within transaction
 * @returns {Promise<any>} Result of the callback function
 */
export async function withTransaction(callback) {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Transaction error:', error);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Get the database pool
 * This is an async function to comply with Server Actions requirements
 * @returns {Promise<Pool>} Database pool
 */
export async function getPool() {
  return Promise.resolve(pool);
}