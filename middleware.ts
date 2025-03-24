import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

// Secret key for JWT signing
const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "your-secret-key-at-least-32-chars-long")

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Skip middleware for API routes and public assets
  if (path.startsWith("/api/") || path.startsWith("/_next/") || path.includes(".") || path === "/favicon.ico") {
    return NextResponse.next()
  }

  // Check if the path is a protected route
  const isAdminRoute = path.startsWith("/admin")
  const isDoctorRoute = path.startsWith("/doctor")
  const isPatientRoute = path.startsWith("/patient")

  // If it's not a protected route, allow access
  if (!isAdminRoute && !isDoctorRoute && !isPatientRoute) {
    return NextResponse.next()
  }

  // Get the token from cookies
  const token = request.cookies.get("session_token")?.value

  // If there's no token, redirect to login
  if (!token) {
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("callbackUrl", path)
    return NextResponse.redirect(loginUrl)
  }

  try {
    // Verify the JWT token
    const { payload } = await jwtVerify(token, JWT_SECRET)

    // Check if the token has expired
    const expires = new Date((payload.exp as number) * 1000)
    if (Date.now() > expires.getTime()) {
      const loginUrl = new URL("/auth/login", request.url)
      loginUrl.searchParams.set("callbackUrl", path)
      return NextResponse.redirect(loginUrl)
    }

    // Check if the user has the correct role for the route
    const role = payload.role as string

    if (isAdminRoute && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }

    if (isDoctorRoute && role !== "DOCTOR" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }

    if (isPatientRoute && role !== "PATIENT" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }

    // Allow access to the route
    return NextResponse.next()
  } catch (error) {
    console.error("Error verifying token:", error)
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("callbackUrl", path)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: [
    // Match all paths except for the ones we want to exclude
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
}

