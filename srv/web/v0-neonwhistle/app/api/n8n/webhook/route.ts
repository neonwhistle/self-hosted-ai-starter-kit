import { type NextRequest, NextResponse } from "next/server"
import { validateN8nWebhook } from "@/lib/n8n"
import { supabaseAdmin } from "@/lib/supabase"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  // Validate the webhook request
  if (!validateN8nWebhook(req.headers)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await req.json()

    // Log the webhook event
    await supabaseAdmin.from("webhook_logs").insert({
      source: "n8n",
      event_type: data.event_type || "webhook",
      payload: data,
      status: "received",
    })

    // Process the webhook data based on event type
    switch (data.event_type) {
      case "form_processed":
        // Update form submission status in Supabase
        if (data.submission_id) {
          await supabaseAdmin
            .from("form_submissions")
            .update({
              processed: true,
              processed_at: new Date().toISOString(),
              processing_notes: data.notes || null,
            })
            .eq("id", data.submission_id)
        }
        break

      case "spam_detected":
        // Add IP to denylist if provided
        if (data.ip) {
          await supabaseAdmin.from("ip_denylist").insert({ ip: data.ip, reason: data.reason || "Flagged by n8n" })
        }
        break

      // Add more event types as needed
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing n8n webhook:", error)

    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://n8n.neonwhistle.com",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  })
}
