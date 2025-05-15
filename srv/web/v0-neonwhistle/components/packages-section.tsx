"use client"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const packages = [
  {
    title: "Digital Clarity & Growth Call",
    description:
      "Make your message loud and clear. In 60 minutes, we'll define your ideal client, clarify your digital brand communication, and build a plan to attract better leads and more profitable jobs—consistently.",
    price: "$297",
    features: [
      "Custom positioning strategy for your specific industry",
      "Competitor analysis to identify your unique advantages",
      "90-day action plan with measurable goals",
      "Follow-up summary document with implementation steps",
      "100% satisfaction guarantee or your money back",
    ],
    cta: "Book Your Strategy Call",
  },
  {
    title: "Conversion-Focused Custom Website",
    description:
      "A mobile-first website built specifically for generating leads and showcasing your expertise. Designed to convert visitors into paying customers.",
    price: "$3,000+",
    features: [
      "Industry-specific messaging that speaks to your ideal customers",
      "Simple lead capture forms that work on any device",
      "Portfolio galleries that highlight your best work",
      "Google Maps and local SEO optimization",
      "Mobile-optimized design that loads quickly",
      "Content that converts visitors into leads",
    ],
    highlighted: true,
  },
  {
    title: "Business Automation Systems",
    description: "Custom tools that handle your follow-ups, scheduling, and client communications automatically.",
    price: "$1,000/mo+",
    features: [
      "Automated text follow-ups for missed calls and quotes",
      "Job scheduling and reminder system",
      "Client onboarding and communication flows",
      "Review collection to build your online reputation",
      "Custom reporting on business performance",
      "Ongoing optimization and support",
    ],
  },
]

export function PackagesSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="packages" ref={ref} className="py-20 bg-background/50 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-neon-teal/10 to-transparent blur-[100px]"></div>
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-neon-purple/10 to-transparent blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat">Our Service Business Growth System</h2>
          <p className="text-lg text-foreground/80">
            A complete system designed specifically for service professionals who want to grow their business.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {packages.map((pkg, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card
                className={`h-full transition-all duration-300 hover:shadow-glow bg-foreground/5 backdrop-blur-sm border-foreground/10 ${
                  pkg.highlighted ? "border-[#FF6B35] shadow-glow-sm" : ""
                }`}
              >
                <CardHeader>
                  <CardTitle className="font-montserrat">{pkg.title}</CardTitle>
                  <CardDescription className="text-foreground/70">{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-3xl font-bold bg-gradient-to-r from-electric-blue to-neon-purple bg-clip-text text-transparent">
                      {pkg.price}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check
                          className={`h-5 w-5 mr-2 shrink-0 ${pkg.highlighted ? "text-[#FF6B35]" : "text-neon-teal"}`}
                        />
                        <span className="text-sm text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      pkg.highlighted
                        ? "bg-[#FF6B35] hover:bg-[#FF6B35]/80 text-black"
                        : "bg-foreground/10 hover:bg-foreground/15 text-foreground"
                    }`}
                  >
                    {pkg.cta || "Get Started"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
