"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, CalendarCheck, MessageCircle, FileText } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function AutomationSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
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
    <section id="how-it-works" ref={ref} className="py-20 bg-background relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-electric-blue/10 to-transparent blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-neon-teal/10 to-transparent blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat">
            Three Simple Steps to Transform Your Business
          </h2>
          <p className="text-lg text-foreground/80">
            Our straightforward process makes it easy to get started and see results quickly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="space-y-8">
              <motion.div className="flex items-start" variants={itemVariants}>
                <div className="mr-4 bg-foreground/10 p-3 rounded-lg border border-foreground/10 group-hover:border-[#FF6B35]/50 transition-colors duration-300">
                  <CalendarCheck className="h-6 w-6 text-[#FF6B35]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-montserrat">Book Your Strategy Call</h3>
                  <p className="text-foreground/80">
                    Choose a time that fits your schedule. The call is $297 and includes a complete roadmap for your
                    business.
                  </p>
                </div>
              </motion.div>

              <motion.div className="flex items-start" variants={itemVariants}>
                <div className="mr-4 bg-foreground/10 p-3 rounded-lg border border-foreground/10 group-hover:border-[#FF6B35]/50 transition-colors duration-300">
                  <MessageCircle className="h-6 w-6 text-[#FF6B35]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-montserrat">Share Your Business Challenges</h3>
                  <p className="text-foreground/80">
                    We'll identify exactly what's holding you back and where the biggest opportunities are for your
                    specific trade.
                  </p>
                </div>
              </motion.div>

              <motion.div className="flex items-start" variants={itemVariants}>
                <div className="mr-4 bg-foreground/10 p-3 rounded-lg border border-foreground/10 group-hover:border-[#FF6B35]/50 transition-colors duration-300">
                  <FileText className="h-6 w-6 text-[#FF6B35]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-montserrat">Get Your Growth Roadmap</h3>
                  <p className="text-foreground/80">
                    Walk away with a clear plan you can implement immediately, with specific steps to attract better
                    clients and streamline your business.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button className="group bg-[#FF6B35] hover:bg-[#FF6B35]/80 text-black">
                  Book Your Strategy Call Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 bg-foreground/5 backdrop-blur-sm border border-foreground/10 p-8 rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold font-montserrat mb-2">Social Proof</h3>
              <p className="text-foreground/80">
                Join the 20+ contractors who've used this system to increase their close rates by 30% or more
              </p>
            </div>

            <div className="bg-foreground/10 p-6 rounded-lg mb-4">
              <p className="italic text-foreground/80 mb-4">
                "Before working with Neonwhistle, I was taking any job I could get. Now I'm booked 3 months out with
                premium projects and charging 40% more."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#FF6B35]/20 flex items-center justify-center mr-3">
                  <span className="text-[#FF6B35] font-bold">JD</span>
                </div>
                <div>
                  <p className="font-bold">John Doe</p>
                  <p className="text-sm text-foreground/60">ABC Contracting</p>
                </div>
              </div>
            </div>

            <div className="bg-foreground/10 p-6 rounded-lg">
              <p className="italic text-foreground/80 mb-4">
                "The automated follow-up system alone has saved me 10 hours a week and helped me close 5 more jobs per
                month."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#FF6B35]/20 flex items-center justify-center mr-3">
                  <span className="text-[#FF6B35] font-bold">JS</span>
                </div>
                <div>
                  <p className="font-bold">Jane Smith</p>
                  <p className="text-sm text-foreground/60">Smith Painting Services</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
