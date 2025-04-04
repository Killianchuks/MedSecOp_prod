'use server';

import * as dbActions from '@/app/actions/db-actions';

// Get the pool and export it as 'db' for backward compatibility
let dbPool = null;
dbActions.getPool().then(pool => {
  dbPool = pool;
});

export const db = dbPool;

// Create compatibility objects
export const cases = {
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
  // Add any other methods that were in your original cases object
};

export const users = {
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
  // Add any other methods that were in your original users object
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