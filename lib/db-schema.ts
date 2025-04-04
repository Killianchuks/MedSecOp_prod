// lib/db/db-schema.ts
import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

// Define your schema objects for TypeScript using drizzle-orm
export const cases = pgTable('cases', {
  id: serial('id').primaryKey(),
  doctorId: integer('doctorId'),
  status: text('status'),
  updatedAt: timestamp('updatedAt'),
  // Add other fields as needed
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  role: text('role'),
  // Add other fields as needed
});

export const settings = pgTable('settings', {
  id: serial('id').primaryKey(),
  key: text('key'),
  value: text('value'),
  // Add other fields as needed
});

export const systemSettings = pgTable('system_settings', {
  id: serial('id').primaryKey(),
  key: text('key'),
  value: text('value'),
  // Add other fields as needed
});