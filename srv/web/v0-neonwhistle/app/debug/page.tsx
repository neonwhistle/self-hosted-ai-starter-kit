"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugPage() {
  const [clientEnvVars, setClientEnvVars] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Only check client-side environment variables that are safe to expose
    const requiredClientVars = [
      "NEXT_PUBLIC_SITE_URL",
      // Remove sensitive variables from client-side checks
    ]

    const results: Record<string, boolean> = {}
    requiredClientVars.forEach((varName) => {
      results[varName] = !!process.env[varName]
    })

    setClientEnvVars(results)
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Environment Debug Page</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Client-Side Environment Variables</CardTitle>
          <CardDescription>
            These variables must be prefixed with NEXT_PUBLIC_ to be accessible in the browser
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {Object.entries(clientEnvVars).map(([varName, isSet]) => (
              <li key={varName} className="flex items-center">
                <span className={`inline-block w-6 h-6 rounded-full mr-2 ${isSet ? "bg-green-500" : "bg-red-500"}`}>
                  {isSet ? "✓" : "✗"}
                </span>
                <span className="font-mono">{varName}</span>
                <span className="ml-2 text-sm text-foreground/60">{isSet ? "Available" : "Missing"}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="bg-foreground/5 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Troubleshooting</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Make sure you have a <code className="bg-foreground/10 px-1 rounded">.env.local</code> file in your project
            root
          </li>
          <li>
            Client-side variables must be prefixed with{" "}
            <code className="bg-foreground/10 px-1 rounded">NEXT_PUBLIC_</code>
          </li>
          <li>After adding environment variables, restart your development server</li>
          <li>For production, make sure to add these variables in your Vercel project settings</li>
          <li>
            Sensitive variables like API keys should be accessed only from server components or API routes, not directly
            in client code
          </li>
        </ul>
      </div>
    </div>
  )
}
