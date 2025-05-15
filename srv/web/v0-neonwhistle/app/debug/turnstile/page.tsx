import { TurnstileDebug } from "@/components/turnstile-debug"

export default function TurnstileDebugPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Turnstile Debug Page</h1>
      <div className="max-w-2xl mx-auto">
        <TurnstileDebug />
      </div>
    </div>
  )
}
