"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ContactForm } from "@/components/contact-form"

export function ContactSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="contact" ref={ref} className="py-20 bg-background relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-neon-teal/10 to-transparent blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-electric-blue/10 to-transparent blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat">
            Ready to Transform Your Service Business?
          </h2>
          <p className="text-lg text-foreground/80">
            Book your $297 Strategy Call today and take the first step toward more profitable jobs and a streamlined
            business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 p-8 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-montserrat">Your $297 Strategy Call Includes:</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-3 text-[#FF6B35]" />
                <span>A customized action plan for your specific trade</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-3 text-[#FF6B35]" />
                <span>Competitor analysis to identify your unique advantages</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-3 text-[#FF6B35]" />
                <span>90-day roadmap with measurable goals</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-3 text-[#FF6B35]" />
                <span>Follow-up summary document with implementation steps</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-3 text-[#FF6B35]" />
                <span>100% satisfaction guarantee or your money back</span>
              </li>
            </ul>

            <div className="mt-8">
              <Button size="lg" className="w-full group bg-[#FF6B35] hover:bg-[#FF6B35]/80 text-black font-medium">
                Book Your Strategy Call Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 font-montserrat">Have Questions?</h3>
              <p className="mb-6 text-foreground/80">
                Not ready to book a call yet? Send us a message and we'll get back to you within one business day.
              </p>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
