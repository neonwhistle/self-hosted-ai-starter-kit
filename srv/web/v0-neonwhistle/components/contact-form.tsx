"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, AlertTriangle } from "lucide-react"
import { Turnstile } from "@marsidev/react-turnstile"

interface FormState {
  name: string
  email: string
  message: string
  formStartTime: number
  submitting: boolean
  submitted: boolean
  error: string | null
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    formStartTime: Date.now(),
    submitting: false,
    submitted: false,
    error: null,
  })

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileError, setTurnstileError] = useState<string | null>(null)
  const [turnstileSiteKey, setTurnstileSiteKey] = useState<string | null>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const turnstileResetAttempts = useRef(0)

  // Fetch Turnstile site key from API
  useEffect(() => {
    async function fetchTurnstileConfig() {
      try {
        const response = await fetch("/api/turnstile/config")
        if (response.ok) {
          const data = await response.json()
          if (data.siteKey) {
            setTurnstileSiteKey(data.siteKey)
          }
        }
      } catch (error) {
        console.error("Failed to fetch Turnstile configuration:", error)
      }
    }

    fetchTurnstileConfig()
    setFormState((prev) => ({ ...prev, formStartTime: Date.now() }))

    // Clean up function
    return () => {
      // Reset state when component unmounts
      setTurnstileToken(null)
      setTurnstileError(null)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleTurnstileError = (error: Error) => {
    console.error("Turnstile error:", error)
    setTurnstileError(`Error: ${error.message || "CAPTCHA verification failed"}`)

    // Don't attempt to reset automatically as it might cause an infinite loop
    turnstileResetAttempts.current += 1
  }

  const handleTurnstileSuccess = (token: string) => {
    console.log("Turnstile verification successful")
    setTurnstileToken(token)
    setTurnstileError(null)
    turnstileResetAttempts.current = 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formState.name || !formState.email || !formState.message) {
      setFormState((prev) => ({ ...prev, error: "Please fill out all fields" }))
      return
    }

    // Make Turnstile optional for now to prevent blocking form submissions
    // if (!turnstileToken) {
    //   setFormState((prev) => ({ ...prev, error: "Please complete the CAPTCHA verification" }))
    //   return
    // }

    setFormState((prev) => ({ ...prev, submitting: true, error: null }))

    try {
      // Create form data
      const formData = new FormData()
      formData.append("name", formState.name)
      formData.append("email", formState.email)
      formData.append("message", formState.message)
      formData.append("form_type", "contact")
      formData.append("form_start_time", formState.formStartTime.toString())

      // Only add token if it exists
      if (turnstileToken) {
        formData.append("cf-turnstile-response", turnstileToken)
      }

      // Add honeypot field (hidden from users)
      formData.append("website_url", "")

      // Submit form
      const response = await fetch("/api/forms/submit", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit form")
      }

      // Reset form on success
      setFormState({
        name: "",
        email: "",
        message: "",
        formStartTime: Date.now(),
        submitting: false,
        submitted: true,
        error: null,
      })

      // Reset Turnstile
      setTurnstileToken(null)
      turnstileResetAttempts.current = 0
    } catch (error) {
      console.error("Form submission error:", error)
      setFormState((prev) => ({
        ...prev,
        submitting: false,
        error: error instanceof Error ? error.message : "An unknown error occurred",
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field - hidden from real users, bots will fill it */}
      <div className="hidden">
        <Label htmlFor="website_url">Website</Label>
        <Input id="website_url" name="website_url" type="text" autoComplete="off" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground/80">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className="bg-foreground/5 border-foreground/10 focus:border-electric-blue/50 focus:ring-electric-blue/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground/80">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Your email"
          required
          className="bg-foreground/5 border-foreground/10 focus:border-electric-blue/50 focus:ring-electric-blue/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-foreground/80">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          placeholder="Tell us about your project"
          rows={5}
          required
          className="bg-foreground/5 border-foreground/10 focus:border-electric-blue/50 focus:ring-electric-blue/20"
        />
      </div>

      <div className="my-4" ref={turnstileRef}>
        <div>
          {turnstileSiteKey ? (
            <Turnstile
              siteKey={turnstileSiteKey}
              onSuccess={handleTurnstileSuccess}
              onError={handleTurnstileError}
              theme="dark"
              refreshExpired="auto"
              responseField={false}
              options={{
                action: "contact_form",
                cData: "contact-page",
                size: "normal",
              }}
            />
          ) : (
            <div className="p-4 border border-yellow-500/30 bg-yellow-500/10 rounded-md text-yellow-500">
              <p className="text-sm flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                CAPTCHA verification is currently unavailable. You can still submit the form.
              </p>
            </div>
          )}
          {turnstileError && (
            <div className="mt-2 p-2 border border-yellow-500/30 bg-yellow-500/10 rounded-md text-yellow-500 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <p className="text-sm">CAPTCHA verification issue: {turnstileError}. You can still submit the form.</p>
            </div>
          )}
        </div>
      </div>

      {formState.error && <div className="text-red-500 text-sm">{formState.error}</div>}

      {formState.submitted && (
        <div className="text-green-500 text-sm">Thank you for your message! We'll be in touch soon.</div>
      )}

      <Button
        type="submit"
        disabled={formState.submitting}
        className="w-full group bg-[#FF6B35] hover:bg-[#FF6B35]/80 text-black font-medium"
      >
        {formState.submitting ? "Sending..." : "Send Message"}
        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </form>
  )
}
