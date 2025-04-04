// lib/db-client.js
// This file provides client-side compatible exports
// No 'use server' directive here

import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { cases as casesSchema, users as usersSchema } from './db-schema';

// Create a mock db object for client-side TypeScript compatibility
const mockDb = {
  select: () => ({ from: () => ({ where: () => ({ limit: () => [] }) }) }),
  update: () => ({ set: () => ({ where: () => {} }) }),
  // Add other methods as needed
};

// Export objects for TypeScript compatibility
export const db = mockDb;
export const cases = casesSchema;
export const users = usersSchema;

// Export a mock supabaseAdmin for client-side compatibility
export const supabaseAdmin = {
  from: () => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: null, error: null }),
    update: () => ({ data: null, error: null }),
    delete: () => ({ data: null, error: null }),
  }),
};

// Export mock functions for client-side compatibility
export function sql() {}
export function withTransaction() {}