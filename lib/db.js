'use server';

import * as dbActions from '@/app/actions/db-actions';
import { cases, users } from './db-schema';
import { eq } from 'drizzle-orm';

// Get the pool and export it as 'db' for backward compatibility
let dbPool = null;
dbActions.getPool().then(pool => {
  dbPool = pool;
});

// Create a db object that implements the drizzle-orm API using our server actions
const dbObject = {
  select: () => ({
    from: (table) => ({
      where: (condition) => ({
        limit: (limit) => dbActions.getAll(table.name)
          .then(result => result.success ? result.data : [])
      })
    })
  }),
  update: (table) => ({
    set: (data) => ({
      where: (condition) => {
        // Extract the ID from the condition
        const id = condition.right;
        return dbActions.update(table.name, id, data)
          .then(result => result.success ? result.data : null);
      }
    })
  }),
  // Add other methods as needed
};

// Export both the async function for server use and the object for TypeScript
export const db = dbPool || dbObject;

// Export schema objects
export { cases, users, eq };

// Add the original query function
export async function query(text, params = []) {
  const result = await dbActions.query(text, params);
  return result.success ? result.data : [];
}

// Export the sql function as an async function
export async function sql(...args) {
  return dbActions.sql(...args);
}

// Export the withTransaction function
export async function withTransaction(callback) {
  return dbActions.withTransaction(callback);
}

// Add a function to get the pool directly
export async function getPool() {
  return dbActions.getPool();
}

// Add supabaseAdmin export
export const supabaseAdmin = {
  from: (table) => ({
    select: async () => {
      const result = await dbActions.getAll(table);
      return { data: result.success ? result.data : [], error: result.success ? null : result.error };
    },
    insert: async (data) => {
      const result = await dbActions.create(table, data);
      return { data: result.success ? result.data : null, error: result.success ? null : result.error };
    },
    update: async (data) => {
      const result = await dbActions.update(table, data.id, data);
      return { data: result.success ? result.data : null, error: result.success ? null : result.error };
    },
    delete: async () => {
      return { data: null, error: null };
    },
  }),
};