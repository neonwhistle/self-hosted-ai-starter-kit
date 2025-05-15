import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { PackagesSection } from "@/components/packages-section"
import { AutomationSection } from "@/components/automation-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ProblemSection } from "@/components/problem-section"
import { IdealClientSection } from "@/components/ideal-client-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <AboutSection />
        <IdealClientSection />
        <AutomationSection />
        <PackagesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
