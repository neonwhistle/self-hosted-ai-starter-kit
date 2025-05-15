// Utility functions for n8n webhook integration

// Validate webhook request from n8n
export function validateN8nWebhook(headers: Headers): boolean {
  const authHeader = headers.get("authorization")
  const expectedAuth = `Bearer ${process.env.N8N_SECRET}`

  // Check if authorization header matches expected value
  if (!authHeader || authHeader !== expectedAuth) {
    return false
  }

  // Check if IP is in allowed list (if configured)
  if (process.env.N8N_ALLOWED_IPS) {
    const ip = headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1"
    const allowedIps = process.env.N8N_ALLOWED_IPS.split(",").map((ip) => ip.trim())

    if (!allowedIps.includes(ip)) {
      return false
    }
  }

  return true
}

// Send data to n8n webhook with retry logic
export async function sendToN8n(data: any): Promise<{ success: boolean; error?: string }> {
  const maxRetries = Number.parseInt(process.env.N8N_WEBHOOK_RETRY_ATTEMPTS || "3")
  const retryDelay = Number.parseInt(process.env.N8N_WEBHOOK_RETRY_DELAY || "2000")
  const timeout = Number.parseInt(process.env.N8N_TIMEOUT || "30000")

  let retries = 0
  let lastError: Error | null = null

  while (retries <= maxRetries) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(process.env.N8N_WEBHOOK_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.N8N_SECRET}`,
          "X-Neonwhistle-Source": "website",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${await response.text()}`)
      }

      return { success: true }
    } catch (error) {
      lastError = error as Error
      retries++

      if (retries <= maxRetries) {
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, retryDelay))
      }
    }
  }

  return {
    success: false,
    error: lastError ? lastError.message : "Unknown error occurred",
  }
}

// Generate a webhook signature for n8n verification
export function generateN8nSignature(payload: any): string {
  const crypto = require("crypto")
  const secret = process.env.N8N_SECRET || ""

  const hmac = crypto.createHmac("sha256", secret)
  hmac.update(JSON.stringify(payload))
  return hmac.digest("hex")
}
