"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Turnstile } from "@marsidev/react-turnstile"

export function TurnstileDebug() {
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [siteKey, setSiteKey] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTurnstileConfig() {
      try {
        const response = await fetch("/api/turnstile/config")
        if (response.ok) {
          const data = await response.json()
          if (data.siteKey) {
            setSiteKey(data.siteKey)
          }
        }
      } catch (error) {
        console.error("Failed to fetch Turnstile configuration:", error)
        setError("Failed to load Turnstile configuration")
      }
    }

    fetchTurnstileConfig()
  }, [])

  const handleSuccess = (token: string) => {
    setToken(token)
    setError(null)
    console.log("Turnstile token:", token)
  }

  const handleError = (error: Error) => {
    setError(`Error: ${error.message}`)
    setToken(null)
    console.error("Turnstile error:", error)
  }

  const verifyToken = async () => {
    if (!token) return

    setLoading(true)
    try {
      const response = await fetch("/api/debug/verify-turnstile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })

      const result = await response.json()
      setVerificationResult(result)
    } catch (err) {
      setVerificationResult({ error: "Failed to verify token" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Turnstile Debug</CardTitle>
        <CardDescription>Test Cloudflare Turnstile integration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Turnstile Widget</h3>
          {siteKey ? (
            <Turnstile siteKey={siteKey} onSuccess={handleSuccess} onError={handleError} theme="dark" />
          ) : (
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md text-yellow-500 text-sm">
              Loading Turnstile configuration...
            </div>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md text-red-500 text-sm">{error}</div>
        )}

        {token && (
          <div className="space-y-2">
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-md text-green-500 text-sm">
              Token generated successfully!
            </div>
            <div className="text-xs font-mono bg-foreground/5 p-2 rounded-md overflow-x-auto">{token}</div>
            <Button onClick={verifyToken} disabled={loading} size="sm">
              {loading ? "Verifying..." : "Verify Token"}
            </Button>
          </div>
        )}

        {verificationResult && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Verification Result</h3>
            <pre className="text-xs bg-foreground/5 p-3 rounded-md overflow-x-auto">
              {JSON.stringify(verificationResult, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-4 text-sm">
          <h3 className="font-medium mb-2">Troubleshooting Tips</h3>
          <ul className="list-disc pl-5 space-y-1 text-foreground/70">
            <li>Make sure your site key is correctly configured in environment variables</li>
            <li>Verify that your domain is allowed in Cloudflare Turnstile settings</li>
            <li>Check that your secret key is properly set in environment variables</li>
            <li>Ensure Content Security Policy allows Cloudflare domains</li>
            <li>Error 110200 typically indicates a domain mismatch or invalid site key</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
