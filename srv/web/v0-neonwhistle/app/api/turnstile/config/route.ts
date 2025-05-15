import { NextResponse } from "next/server"

export async function GET() {
  // Return a minimal configuration object with just what the client needs
  return NextResponse.json({
    siteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
  })
}
