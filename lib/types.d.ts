// lib/types.d.ts
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
  
  // Define SQL-related types inline
  interface SQLWrapper {
    getSQL(): { sql: string; params: unknown[] };
  }
  
  // Add type definitions for the db-client.js exports
  declare module '@/lib/db-client' {
    export const cases: any;
    export const users: any;
    export const eq: (left: any, right: any) => SQLWrapper;
    
    export const db: {
      select: () => {
        from: (table: any) => {
          where: (condition: any) => {
            limit: (limit: number) => User[] | Case[];
          };
        };
      };
      update: (table: any) => {
        set: (data: any) => {
          where: (condition: any) => void;
        };
      };
    };
    
    export const supabaseAdmin: {
      from: (table: string) => {
        select: () => { data: any[]; error: null | Error };
        insert: () => { data: any; error: null | Error };
        update: () => { data: any; error: null | Error };
        delete: () => { data: any; error: null | Error };
      };
    };
    
    export function sql(): void;
    export function withTransaction(): void;
  }