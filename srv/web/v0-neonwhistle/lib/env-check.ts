/**
 * Utility to check if required environment variables are set
 * This can be used during development to diagnose issues
 */

export function checkRequiredEnvVars() {
  const requiredClientVars = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_SITE_URL",
    // Remove sensitive variables from client-side checks
  ]

  const requiredServerVars = [
    "SUPABASE_SERVICE_ROLE_KEY",
    "TURNSTILE_SECRET_KEY",
    "NEXT_PUBLIC_TURNSTILE_SITE_KEY", // This is checked server-side only
    "N8N_WEBHOOK_URL",
    "N8N_SECRET",
    "MCP_SECRET",
  ]

  // Check client-side variables
  console.log("Checking client-side environment variables:")
  requiredClientVars.forEach((varName) => {
    const value = process.env[varName]
    console.log(`${varName}: ${value ? "✅ Set" : "❌ Missing"}`)
  })

  // In development, we can also check server-side variables
  if (process.env.NODE_ENV === "development") {
    console.log("\nChecking server-side environment variables:")
    requiredServerVars.forEach((varName) => {
      const value = process.env[varName]
      console.log(`${varName}: ${value ? "✅ Set" : "❌ Missing"}`)
    })
  }
}
