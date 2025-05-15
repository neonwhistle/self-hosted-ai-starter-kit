import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { checkForSpam, getClientIp } from "@/lib/anti-spam"
import { sendToN8n, generateN8nSignature } from "@/lib/n8n"

// Update the verifyTurnstileToken function to use the hardcoded key if needed
async function verifyTurnstileToken(token: string, ip: string): Promise<{ success: boolean }> {
  try {
    const formData = new URLSearchParams()
    formData.append("secret", process.env.TURNSTILE_SECRET_KEY || "0x4AAAAAABYAom36YUvX9l2u7Qm5q4aWAvE")
    formData.append("response", token)
    formData.append("remoteip", ip)

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    if (!response.ok) {
      throw new Error(`Turnstile verification failed with status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error verifying Turnstile token:", error)
    // Return failure but don't throw an error
    return { success: false }
  }
}

export async function POST(req: NextRequest) {
  // Get client IP for spam checking
  const ip = getClientIp(req)

  // Get form data
  const formData = await req.formData()

  // Get form start time from hidden field
  const startTimeStr = formData.get("form_start_time") as string
  const startTime = startTimeStr ? Number.parseInt(startTimeStr) : Date.now() - 60000

  // Check for spam
  const spamCheck = await checkForSpam(formData, ip, startTime)

  // Generate a unique submission ID
  const submissionId = crypto.randomUUID()

  // Prepare submission data
  const formType = formData.get("form_type") as string
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  const submissionData = {
    id: submissionId,
    form_type: formType || "contact",
    name,
    email,
    message,
    ip_address: ip,
    user_agent: req.headers.get("user-agent") || "",
    spam_score: spamCheck.score,
    spam_reasons: spamCheck.reasons,
    is_spam: spamCheck.isSpam,
  }

  try {
    // Store in Supabase regardless of spam status (for analysis)
    const { error } = await supabaseAdmin.from("form_submissions").insert(submissionData)

    if (error) {
      console.error("Supabase error:", error)
      throw new Error("Failed to store form submission")
    }

    // If it's spam, don't process further but still return success to the user
    if (spamCheck.isSpam) {
      // Notify n8n about spam submission for analysis
      try {
        await sendToN8n({
          event_type: "spam_detected",
          submission_id: submissionId,
          spam_score: spamCheck.score,
          spam_reasons: spamCheck.reasons,
          ip: ip,
          timestamp: new Date().toISOString(),
        })
      } catch (n8nError) {
        console.error("Failed to send spam notification to n8n:", n8nError)
        // Continue anyway - this is just a notification
      }

      // Return success to avoid tipping off spammers
      return NextResponse.json({
        success: true,
        message: "Form submitted successfully",
        id: submissionId,
      })
    }

    // For legitimate submissions, send to n8n for processing
    const n8nPayload = {
      event_type: "form_submission",
      submission_id: submissionId,
      form_type: formType || "contact",
      data: {
        name,
        email,
        message,
        submission_time: new Date().toISOString(),
      },
      signature: "", // Will be filled below
    }

    // Add signature for verification
    n8nPayload.signature = generateN8nSignature(n8nPayload)

    // Send to n8n
    try {
      const n8nResult = await sendToN8n(n8nPayload)

      if (!n8nResult.success) {
        console.error("Failed to send to n8n:", n8nResult.error)
        // Update submission status in Supabase
        await supabaseAdmin
          .from("form_submissions")
          .update({
            n8n_status: "failed",
            n8n_error: n8nResult.error,
          })
          .eq("id", submissionId)
      } else {
        // Update submission status in Supabase
        await supabaseAdmin.from("form_submissions").update({ n8n_status: "sent" }).eq("id", submissionId)
      }
    } catch (n8nError) {
      console.error("Error sending to n8n:", n8nError)
      // Continue anyway - we've already stored the submission
    }

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      id: submissionId,
    })
  } catch (error) {
    console.error("Error processing form submission:", error)

    return NextResponse.json({ success: false, message: "Failed to process form submission" }, { status: 500 })
  }
}
