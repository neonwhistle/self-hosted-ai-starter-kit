import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET(req: NextRequest) {
  // Validate MCP request
  const authHeader = req.headers.get("authorization")
  const expectedAuth = `Bearer ${process.env.MCP_SECRET}`

  if (!authHeader || authHeader !== expectedAuth) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  try {
    // Get query parameters
    const url = new URL(req.url)
    const limit = Number.parseInt(url.searchParams.get("limit") || "50")
    const offset = Number.parseInt(url.searchParams.get("offset") || "0")
    const isSpam = url.searchParams.get("is_spam")
    const processed = url.searchParams.get("processed")
    const formType = url.searchParams.get("form_type")

    // Build query
    let query = supabaseAdmin
      .from("form_submissions")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    // Apply filters if provided
    if (isSpam !== null) {
      query = query.eq("is_spam", isSpam === "true")
    }

    if (processed !== null) {
      query = query.eq("processed", processed === "true")
    }

    if (formType) {
      query = query.eq("form_type", formType)
    }

    // Execute query
    const { data, error, count } = await query

    if (error) throw error

    return NextResponse.json({
      success: true,
      data,
      count,
      limit,
      offset,
    })
  } catch (error) {
    console.error("Error fetching submissions:", error)

    return NextResponse.json({ success: false, message: "Failed to fetch submissions" }, { status: 500 })
  }
}
