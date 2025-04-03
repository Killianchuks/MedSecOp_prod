// This is a type definition file for your database utilities

export interface SqlQueryResult<T = any> {
    rows: T[]
    // Add other properties your SQL result might have
    rowCount?: number
  }
  
  export function sql<T = SqlQueryResult>(strings: TemplateStringsArray, ...values: any[]): Promise<T>
  
  export function verifyPassword(password: string, passwordHash: string, passwordSalt: string): boolean
  
  