import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-foreground p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-neon-purple/20 to-transparent blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-electric-blue/20 to-transparent blur-[100px]"></div>
        <div className="absolute inset-0 bg-grid-small opacity-10"></div>
      </div>

      <div className="relative z-10 text-center max-w-md">
        <h1 className="text-9xl font-bold font-montserrat bg-gradient-to-r from-electric-blue via-neon-purple to-neon-teal bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl font-bold mt-4 mb-6">Page Not Found</h2>
        <p className="text-foreground/70 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/">
          <Button className="bg-electric-blue hover:bg-electric-blue/80 text-black font-medium">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
