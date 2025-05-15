import type { NextRequest } from "next/server"

// Types for spam detection
export interface SpamCheckResult {
  isSpam: boolean
  score: number
  reasons: string[]
}

// Honeypot check
export function checkHoneypot(formData: FormData): boolean {
  // Check if honeypot field is filled (bots will fill this, humans won't see it)
  const honeypotValue = formData.get("website_url")
  return !!honeypotValue
}

// Time-based check
export function checkSubmissionTime(startTime: number): boolean {
  const submissionDelay = Number.parseInt(process.env.FORM_SUBMISSION_DELAY || "2000")
  const elapsedTime = Date.now() - startTime
  return elapsedTime < submissionDelay
}

// URL detection in text fields
export function detectUrls(text: string): boolean {
  if (!process.env.URL_FILTERING_ENABLED || process.env.URL_FILTERING_ENABLED !== "true") {
    return false
  }

  // Simple URL detection regex
  const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi
  const matches = text.match(urlRegex)
  return matches !== null && matches.length > 0
}

// Email validation
export function validateEmail(email: string): boolean {
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// IP rate limiting
const ipRequestCounts: Record<string, { count: number; timestamp: number }> = {}

export function checkRateLimit(ip: string): boolean {
  const rateLimit = Number.parseInt(process.env.FORM_RATE_LIMIT || "5")
  const rateLimitWindow = Number.parseInt(process.env.FORM_RATE_LIMIT_WINDOW || "3600") * 1000 // Convert to ms

  const now = Date.now()

  // Clean up old entries
  Object.keys(ipRequestCounts).forEach((key) => {
    if (now - ipRequestCounts[key].timestamp > rateLimitWindow) {
      delete ipRequestCounts[key]
    }
  })

  // Check if IP exists in the record
  if (!ipRequestCounts[ip]) {
    ipRequestCounts[ip] = { count: 1, timestamp: now }
    return false
  }

  // Check if the IP has exceeded the rate limit
  if (ipRequestCounts[ip].count >= rateLimit) {
    return true
  }

  // Increment the count
  ipRequestCounts[ip].count++
  return false
}

// IP denylist check
const deniedIps = new Set<string>()

export function isIpDenied(ip: string): boolean {
  if (!process.env.DENYLIST_ENABLED || process.env.DENYLIST_ENABLED !== "true") {
    return false
  }
  return deniedIps.has(ip)
}

export function addIpToDenylist(ip: string): void {
  deniedIps.add(ip)
}

// Comprehensive spam check
export async function checkForSpam(formData: FormData, ip: string, startTime: number): Promise<SpamCheckResult> {
  const result: SpamCheckResult = {
    isSpam: false,
    score: 0,
    reasons: [],
  }

  // Check honeypot
  if (checkHoneypot(formData)) {
    result.isSpam = true
    result.score += 100
    result.reasons.push("Honeypot field filled")
  }

  // Check submission time
  if (checkSubmissionTime(startTime)) {
    result.isSpam = true
    result.score += 50
    result.reasons.push("Submission too quick")
  }

  // Check rate limit
  if (checkRateLimit(ip)) {
    result.isSpam = true
    result.score += 75
    result.reasons.push("Rate limit exceeded")
  }

  // Check IP denylist
  if (isIpDenied(ip)) {
    result.isSpam = true
    result.score += 100
    result.reasons.push("IP in denylist")
  }

  // Check for URLs in message
  const message = formData.get("message") as string
  if (message && detectUrls(message)) {
    result.score += 25
    result.reasons.push("URLs detected in message")
    if (result.score >= 50) result.isSpam = true
  }

  // Check email validity
  const email = formData.get("email") as string
  if (email && !validateEmail(email)) {
    result.score += 50
    result.reasons.push("Invalid email format")
    result.isSpam = true
  }

  // Verify Cloudflare Turnstile token (only if the secret key is configured)
  // Make this optional to prevent blocking form submissions
  const token = formData.get("cf-turnstile-response") as string
  if (process.env.TURNSTILE_SECRET_KEY && token) {
    try {
      const turnstileResult = await verifyTurnstileToken(token, ip)
      if (!turnstileResult.success) {
        result.score += 50
        result.reasons.push("CAPTCHA verification failed")

        // Only mark as spam if the score is high enough
        if (result.score >= 50) {
          result.isSpam = true
        }
      }
    } catch (error) {
      // Log the error but don't automatically mark as spam
      console.error("Turnstile verification error:", error)
      result.score += 30
      result.reasons.push("CAPTCHA verification error")

      // Only mark as spam if other factors also suggest it's spam
      if (result.score >= 50) {
        result.isSpam = true
      }
    }
  }

  return result
}

// Verify Cloudflare Turnstile token
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

// Extract IP from request
export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")
  const ip = forwarded ? forwarded.split(",")[0] : "127.0.0.1"
  return ip
}
