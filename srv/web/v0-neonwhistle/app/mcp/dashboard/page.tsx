import { SubmissionDashboard } from "@/components/mcp/submission-dashboard"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Management Control Panel</h1>
      <SubmissionDashboard />
    </div>
  )
}
