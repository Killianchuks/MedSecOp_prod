'use server';

import * as dbActions from '@/app/actions/db-actions';
// Import the schema objects
import { cases as casesSchema, users as usersSchema } from './db-schema';

// Get the pool and export it as 'db' for backward compatibility
let dbPool = null;
dbActions.getPool().then(pool => {
  dbPool = pool;
});

// Create a db object that TypeScript can understand
const dbObject = {
  select: () => ({ from: () => ({ where: () => ({ limit: () => [] }) }) }),
  update: () => ({ set: () => ({ where: () => {} }) }),
  // Add other methods as needed
};

// Export both the async function for server use and the object for TypeScript
export const db = dbPool || dbObject;

// Export schema objects for TypeScript
export const cases = casesSchema;
export const users = usersSchema;

// Create compatibility objects for server use
export const casesActions = {
  getAll: async () => {
    const result = await dbActions.getAll('cases');
    return result.success ? result.data : [];
  },
  getById: async (id) => {
    const result = await dbActions.getById('cases', id);
    return result.success ? result.data[0] : null;
  },
  create: async (data) => {
    const result = await dbActions.create('cases', data);
    return result.success ? result.data[0] : null;
  },
  update: async (id, data) => {
    const result = await dbActions.update('cases', id, data);
    return result.success ? result.data[0] : null;
  },
  delete: async (id) => {
    const result = await dbActions.remove('cases', id);
    return result.success ? result.data[0] : null;
  },
};

export const usersActions = {
  getAll: async () => {
    const result = await dbActions.getAll('users');
    return result.success ? result.data : [];
  },
  getById: async (id) => {
    const result = await dbActions.getById('users', id);
    return result.success ? result.data[0] : null;
  },
  create: async (data) => {
    const result = await dbActions.create('users', data);
    return result.success ? result.data[0] : null;
  },
  update: async (id, data) => {
    const result = await dbActions.update('users', id, data);
    return result.success ? result.data[0] : null;
  },
  delete: async (id) => {
    const result = await dbActions.remove('users', id);
    return result.success ? result.data[0] : null;
  },
};

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