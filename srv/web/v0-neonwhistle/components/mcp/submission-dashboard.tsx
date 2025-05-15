"use client"

import { useState, useEffect } from "react"
import { supabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, X, AlertTriangle, Clock } from "lucide-react"

interface FormSubmission {
  id: string
  form_type: string
  name: string
  email: string
  message: string
  created_at: string
  is_spam: boolean
  spam_score: number
  processed: boolean
  n8n_status: string | null
}

export function SubmissionDashboard() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    fetchSubmissions()
  }, [activeTab])

  async function fetchSubmissions() {
    try {
      setLoading(true)

      let query = supabaseClient
        .from("form_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50)

      // Apply filters based on active tab
      switch (activeTab) {
        case "spam":
          query = query.eq("is_spam", true)
          break
        case "legitimate":
          query = query.eq("is_spam", false)
          break
        case "processed":
          query = query.eq("processed", true)
          break
        case "unprocessed":
          query = query.eq("processed", false)
          break
      }

      const { data, error } = await query

      if (error) throw error

      setSubmissions(data || [])
    } catch (err) {
      console.error("Error fetching submissions:", err)
      setError("Failed to load submissions")
    } finally {
      setLoading(false)
    }
  }

  async function markAsProcessed(id: string) {
    try {
      const { error } = await supabaseClient
        .from("form_submissions")
        .update({ processed: true, processed_at: new Date().toISOString() })
        .eq("id", id)

      if (error) throw error

      // Refresh submissions
      fetchSubmissions()
    } catch (err) {
      console.error("Error updating submission:", err)
      setError("Failed to update submission")
    }
  }

  async function markAsSpam(id: string) {
    try {
      const { error } = await supabaseClient.from("form_submissions").update({ is_spam: true }).eq("id", id)

      if (error) throw error

      // Refresh submissions
      fetchSubmissions()
    } catch (err) {
      console.error("Error marking as spam:", err)
      setError("Failed to mark as spam")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Form Submissions</h2>
        <Button onClick={fetchSubmissions} variant="outline" size="sm">
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="legitimate">Legitimate</TabsTrigger>
          <TabsTrigger value="spam">Spam</TabsTrigger>
          <TabsTrigger value="processed">Processed</TabsTrigger>
          <TabsTrigger value="unprocessed">Unprocessed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {loading ? (
            <div className="text-center py-8">Loading submissions...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-8">No submissions found</div>
          ) : (
            <div className="grid gap-4">
              {submissions.map((submission) => (
                <Card key={submission.id} className={submission.is_spam ? "border-red-400/50" : ""}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{submission.name}</CardTitle>
                        <CardDescription>{submission.email}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {submission.is_spam && (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Spam
                          </Badge>
                        )}
                        {submission.processed ? (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 flex items-center gap-1">
                            <Check className="h-3 w-3" />
                            Processed
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{submission.message}</p>
                    <div className="mt-4 text-sm text-foreground/60">
                      <p>Submitted: {new Date(submission.created_at).toLocaleString()}</p>
                      <p>Form Type: {submission.form_type}</p>
                      {submission.is_spam && <p>Spam Score: {submission.spam_score}</p>}
                      {submission.n8n_status && <p>n8n Status: {submission.n8n_status}</p>}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    {!submission.is_spam && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsSpam(submission.id)}
                        className="text-red-500 border-red-500/20 hover:bg-red-500/10"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Mark as Spam
                      </Button>
                    )}
                    {!submission.processed && (
                      <Button variant="outline" size="sm" onClick={() => markAsProcessed(submission.id)}>
                        <Check className="h-4 w-4 mr-1" />
                        Mark as Processed
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
