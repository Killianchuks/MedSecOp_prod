// lib/db/db-client.ts
import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { eq, type SQL } from 'drizzle-orm';
import { cases, users, settings, systemSettings } from '../db-schema';
import type { PgTableWithColumns } from 'drizzle-orm/pg-core';

// Define interfaces for our mock data
interface User {
  id: number;
  role: string;
  [key: string]: any;
}

interface Case {
  id: number;
  doctorId: number | null;
  status: string;
  updatedAt: Date;
  [key: string]: any;
}

// Create mock data for testing
const mockUsers: User[] = [
  { id: 1, role: "ADMIN" },
  { id: 2, role: "DOCTOR" },
  { id: 3, role: "PATIENT" }
];

const mockCases: Case[] = [
  { id: 1, doctorId: null, status: "NEW", updatedAt: new Date() },
  { id: 2, doctorId: 2, status: "ASSIGNED", updatedAt: new Date() }
];

// Helper function to extract table name from drizzle table object
function getTableName(table: PgTableWithColumns<any>): string {
  return table.$name;
}

// Helper function to extract ID from SQL condition
function extractIdFromCondition(condition: SQL<unknown>): any {
  // In a real implementation, we would parse the SQL condition
  // For our mock, we'll extract the ID from the condition's toString() representation
  // This is a simplified approach - in a real app, you'd need more robust parsing
  const conditionStr = condition.toString();
  const match = conditionStr.match(/= (\d+)/);
  return match ? parseInt(match[1]) : null;
}

// Create a mock db object that matches the drizzle-orm API
const mockDb = {
  select: () => ({
    from: (table: PgTableWithColumns<any>) => ({
      where: (condition: SQL<unknown>) => ({
        limit: (limit: number) => {
          // Extract ID from the condition
          const id = extractIdFromCondition(condition);
          const tableName = getTableName(table);
          
          // Return appropriate mock data based on the table
          if (tableName === 'users') {
            return mockUsers.filter(user => user.id === id);
          } else if (tableName === 'cases') {
            return mockCases.filter(case_ => case_.id === id);
          }
          return [];
        }
      })
    })
  }),
  update: (table: PgTableWithColumns<any>) => ({
    set: (data: any) => ({
      where: (condition: SQL<unknown>) => {
        // Extract ID from the condition
        const id = extractIdFromCondition(condition);
        const tableName = getTableName(table);
        
        // Mock update logic
        if (tableName === 'cases') {
          const caseIndex = mockCases.findIndex(case_ => case_.id === id);
          if (caseIndex >= 0) {
            mockCases[caseIndex] = { ...mockCases[caseIndex], ...data };
          }
        }
      }
    })
  }),
};

// Export the mock db
export const db = mockDb;

// Export schema objects and utilities
export { cases, users, settings, systemSettings, eq };

// Mock supabaseAdmin for client-side compatibility
export const supabaseAdmin = {
  from: (table: string) => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: null, error: null }),
    update: () => ({ data: null, error: null }),
    delete: () => ({ data: null, error: null }),
  }),
};

// Mock functions for client-side compatibility
export function query() { return []; }
export function sql() {}
export function withTransaction() {}
export function getPool() { return {}; }
export function checkDatabaseConnection() { return true; }
export function verifyPassword() { return true; }
export function hashPassword() { return { hash: '', salt: '' }; }
export function generateSalt() { return ''; }
export function rawQuery() { return []; }

// Export compatibility objects
export const casesActions = {
  getAll: async () => [],
  getById: async () => null,
  create: async () => null,
  update: async () => null,
  delete: async () => null,
};

export const usersActions = {
  getAll: async () => [],
  getById: async () => null,
  create: async () => null,
  update: async () => null,
  delete: async () => null,
};