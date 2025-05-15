import { NextResponse } from "next/server"

export const runtime = "edge"

export async function GET() {
  return NextResponse.json(
    {
      name: "Neonwhistle API",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    },
  )
}
