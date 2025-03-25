import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { jwtVerify, SignJWT } from "jose"
import type { NextApiRequest, NextApiResponse } from "next"
import type { GetServerSidePropsContext } from "next"
import { parse } from "cookie"

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface Session {
  user: User
  expires: Date
}

// Secret key for JWT signing
const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "your-secret-key-at-least-32-chars-long")

// Auth options configuration
export const authOptions = {
  providers: [
    {
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      authorize: async (credentials: { email: string; password: string }) => {
        try {
          // In a real application, you would verify credentials against your database
          // This is a simplified example
          if (credentials.email && credentials.password) {
            // Return a mock user for demonstration
            return {
              id: "1",
              email: credentials.email,
              firstName: "John",
              lastName: "Doe",
              role: UserRole.ADMIN,
            }
          }
          return null
        } catch (error) {
          console.error("Error in authorize:", error)
          return null
        }
      },
    },
  ],
  callbacks: {
    jwt: async ({ token, user }: { token: any; user: any }) => {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.role = user.role
      }
      return token
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          firstName: token.firstName,
          lastName: token.lastName,
          role: token.role,
        }
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}

// Create a session
export async function createSession(user: User): Promise<string> {
  // Create a JWT token
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // Token expires in 7 days
    .sign(JWT_SECRET)

  return token
}

// Get token from request (works with both App Router and Pages Router)
function getTokenFromRequest(req: NextRequest | NextApiRequest | Request): string | null {
  // For NextRequest (middleware)
  if ("cookies" in req && typeof req.cookies.get === "function") {
    return req.cookies.get("session_token")?.value || null
  }

  // For NextApiRequest (Pages Router)
  if ("cookies" in req && typeof req.cookies === "object" && !("get" in req.cookies)) {
    return req.cookies.session_token || null
  }

  // For standard Request (fetch API)
  if ("headers" in req && typeof req.headers.get === "function") {
    const cookieHeader = req.headers.get("cookie")
    if (cookieHeader) {
      const cookies = parse(cookieHeader)
      return cookies.session_token || null
    }
  }

  return null
}

// Get the session from the request (App Router compatible)
export async function getSession(req: NextRequest | NextApiRequest | Request): Promise<Session | null> {
  const token = getTokenFromRequest(req)

  if (!token) {
    return null
  }

  try {
    // Verify the JWT token
    const { payload } = await jwtVerify(token, JWT_SECRET)

    // Check if the token has expired
    const expires = new Date((payload.exp as number) * 1000)
    if (Date.now() > expires.getTime()) {
      return null
    }

    // Return the session
    return {
      user: {
        id: payload.id as string,
        email: payload.email as string,
        firstName: payload.firstName as string,
        lastName: payload.lastName as string,
        role: payload.role as UserRole,
      },
      expires,
    }
  } catch (error) {
    console.error("Error verifying token:", error)
    return null
  }
}

// Get the current user from cookies (Pages Router compatible)
export async function getCurrentUser(req?: NextApiRequest): Promise<User | null> {
  let token: string | null = null

  // If request is provided (Pages Router)
  if (req && "cookies" in req) {
    token = req.cookies.session_token || null
  }
  // Otherwise, try to get from document.cookie (Client-side)
  else if (typeof document !== "undefined") {
    const cookies = parse(document.cookie)
    token = cookies.session_token || null
  }

  if (!token) {
    return null
  }

  try {
    // Verify the JWT token
    const { payload } = await jwtVerify(token, JWT_SECRET)

    // Check if the token has expired
    const expires = new Date((payload.exp as number) * 1000)
    if (Date.now() > expires.getTime()) {
      return null
    }

    // Return the user
    return {
      id: payload.id as string,
      email: payload.email as string,
      firstName: payload.firstName as string,
      lastName: payload.lastName as string,
      role: payload.role as UserRole,
    }
  } catch (error) {
    console.error("Error verifying token:", error)
    return null
  }
}

/**
 * withAuth wraps an App Router handler to protect routes with authentication
 * and (optionally) role checking.
 * @param handler - The handler that accepts (req, user)
 * @param allowedRoles - An array of allowed roles for this route.
 */
export function withAuth(
  handler: (req: NextRequest, user: User) => Promise<NextResponse>,
  allowedRoles: UserRole[]
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    // Example: Retrieve and verify token (this is a simplified example)
    const token = req.cookies.get("session_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "fallback-secret"));
      const user: User = {
        id: payload.id as string,
        email: payload.email as string,
        firstName: payload.firstName as string,
        lastName: payload.lastName as string,
        role: payload.role as UserRole,
      };

      // Check allowed roles
      if (!allowedRoles.includes(user.role)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      // Call the handler with the authenticated user
      return handler(req, user);
    } catch (error) {
      console.error("Error verifying token:", error);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  };
}

// Function to protect server-side rendered pages
export async function withAuthSSR(context: GetServerSidePropsContext, requiredRole?: UserRole) {
  const { req } = context
  const token = req.cookies.session_token

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  try {
    // Verify the JWT token
    const { payload } = await jwtVerify(token, JWT_SECRET)

    // Check if the token has expired
    const expires = new Date((payload.exp as number) * 1000)
    if (Date.now() > expires.getTime()) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      }
    }

    // Get the user from the token
    const user = {
      id: payload.id as string,
      email: payload.email as string,
      firstName: payload.firstName as string,
      lastName: payload.lastName as string,
      role: payload.role as UserRole,
    }

    // Check if the user has the required role
    if (requiredRole && user.role !== requiredRole) {
      return {
        redirect: {
          destination: "/unauthorized",
          permanent: false,
        },
      }
    }

    // Return the user
    return {
      props: {
        user,
      },
    }
  } catch (error) {
    console.error("Error verifying token:", error)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
}

// For App Router - Server Component usage
export async function getServerSession() {
  // This function should only be used in App Router Server Components
  // We'll implement a version that doesn't use next/headers

  // For server components that need the session, they should use:
  // 1. Route Handlers: Use the getSession(request) function
  // 2. Server Components: Pass the request object from the page props

  throw new Error("getServerSession() should not be called directly. Use getSession(request) instead.")
}

