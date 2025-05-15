import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json()

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1"

    // Create form data for Turnstile verification
    const formData = new URLSearchParams()
    formData.append("secret", process.env.TURNSTILE_SECRET_KEY || "0x4AAAAAABYAom36YUvX9l2u7Qm5q4aWAvE")
    formData.append("response", token)
    formData.append("remoteip", ip)

    // Send verification request to Cloudflare
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    const result = await response.json()

    return NextResponse.json({
      success: result.success,
      details: result,
      debug: {
        ip,
        secretKeyProvided: !!process.env.TURNSTILE_SECRET_KEY,
        secretKeyUsed: process.env.TURNSTILE_SECRET_KEY || "0x4AAAAAABYAom36YUvX9l2u7Qm5q4aWAvE",
      },
    })
  } catch (error) {
    console.error("Error verifying Turnstile token:", error)
    return NextResponse.json(
      {
        error: "Failed to verify token",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
