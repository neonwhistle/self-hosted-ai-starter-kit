import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Allowed origins for CORS
const allowedOrigins = [
  "https://neonwhistle.com",
  "https://www.neonwhistle.com",
  "https://n8n.neonwhistle.com",
  "https://mcp.neonwhistle.com",
]

export function middleware(request: NextRequest) {
  // Get the pathname
  const { pathname } = request.nextUrl

  // Get origin from request
  const origin = request.headers.get("origin")

  // Response object to modify
  const response = NextResponse.next()

  // Add security headers to all responses
  response.headers.set("X-DNS-Prefetch-Control", "on")
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  // Set Content Security Policy
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://challenges.cloudflare.com; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: blob:; " +
      "font-src 'self'; " +
      "connect-src 'self' https://challenges.cloudflare.com; " +
      "frame-src 'self' https://challenges.cloudflare.com; " +
      "object-src 'none';",
  )

  // Handle CORS for API routes
  if (pathname.startsWith("/api/")) {
    // Check if the origin is in our allowed list
    if (origin && allowedOrigins.includes(origin)) {
      // Set CORS headers for allowed origins
      response.headers.set("Access-Control-Allow-Origin", origin)
      response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
      response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
      response.headers.set("Access-Control-Max-Age", "86400")
    }

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: response.headers,
      })
    }

    // Special handling for n8n webhook endpoint
    if (pathname.startsWith("/api/n8n/webhook")) {
      response.headers.set("Access-Control-Allow-Origin", "https://n8n.neonwhistle.com")
    }

    // Special handling for MCP API endpoints
    if (pathname.startsWith("/api/mcp/")) {
      response.headers.set("Access-Control-Allow-Origin", "https://mcp.neonwhistle.com")
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
