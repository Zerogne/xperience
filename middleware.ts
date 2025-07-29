import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value

  const publicPaths = ["/", "/auth/login", "/auth/register"]
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname)

  if (isPublicPath) {
    // If on a public path and already logged in, redirect to dashboard
    if (token) {
      try {
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret")
        if (decodedToken.type === "student") {
          return NextResponse.redirect(new URL("/dashboard/student", request.url))
        } else if (decodedToken.type === "company") {
          return NextResponse.redirect(new URL("/dashboard/company", request.url))
        }
      } catch (error) {
        // Token is invalid or expired, allow access to public path
        console.log("Invalid or expired token on public path:", error)
      }
    }
    return NextResponse.next() // Allow access to public path
  } else {
    // If on a protected path and no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    try {
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret")
      // Attach user info to request headers for server-side use (optional, but good practice)
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set("x-user-id", decodedToken.userId)
      requestHeaders.set("x-user-email", decodedToken.email)
      requestHeaders.set("x-user-type", decodedToken.type)

      // Redirect based on user type if trying to access wrong dashboard
      if (request.nextUrl.pathname.startsWith("/dashboard/student") && decodedToken.type !== "student") {
        return NextResponse.redirect(new URL("/dashboard/company", request.url))
      }
      if (request.nextUrl.pathname.startsWith("/dashboard/company") && decodedToken.type !== "company") {
        return NextResponse.redirect(new URL("/dashboard/student", request.url))
      }
      if (request.nextUrl.pathname.startsWith("/admin") && decodedToken.type !== "admin") {
        // Assuming 'admin' type for admin routes, redirect to appropriate dashboard if not admin
        if (decodedToken.type === "student") {
          return NextResponse.redirect(new URL("/dashboard/student", request.url))
        } else if (decodedToken.type === "company") {
          return NextResponse.redirect(new URL("/dashboard/company", request.url))
        }
      }

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      console.error("Token verification failed:", error)
      // If token is invalid or expired, redirect to login
      const response = NextResponse.redirect(new URL("/auth/login", request.url))
      response.cookies.delete("token") // Clear invalid token
      return response
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
