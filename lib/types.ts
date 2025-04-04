// lib/types.ts
export interface User {
    id: number;
    role: string;
    // Add other user fields as needed
  }
  
  export interface Case {
    id: number;
    doctorId: number | null;
    status: string;
    updatedAt: Date;
    // Add other case fields as needed
  }