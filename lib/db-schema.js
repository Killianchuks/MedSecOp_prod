// lib/db-schema.js
// This file defines the schema objects for TypeScript compatibility
// No 'use server' directive here

// Define your schema objects for TypeScript
export const cases = {
    id: { name: 'id' },
    doctorId: { name: 'doctorId' },
    status: { name: 'status' },
    updatedAt: { name: 'updatedAt' },
    // Add other fields as needed
  };
  
  export const users = {
    id: { name: 'id' },
    role: { name: 'role' },
    // Add other fields as needed
  };