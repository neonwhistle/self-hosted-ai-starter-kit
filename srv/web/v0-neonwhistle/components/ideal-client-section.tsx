"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { PenToolIcon as Tool, Phone, Truck } from "lucide-react"

export function IdealClientSection() {
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
    <section id="ideal-client" ref={ref} className="py-20 bg-background relative">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat">Is This Right for Your Business?</h2>
          <p className="text-lg text-foreground/80">
            Our system works best for service professionals and skilled trades who meet these criteria:
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 p-8 rounded-lg"
          >
            <div className="w-16 h-16 bg-foreground/10 rounded-lg flex items-center justify-center mb-6">
              <Tool className="h-8 w-8 text-[#FF6B35]" />
            </div>
            <h3 className="text-xl font-bold mb-4 font-montserrat">Established Businesses</h3>
            <p className="text-foreground/80">
              You've been in business for at least 1 year and have a track record of completed projects and satisfied
              customers.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 p-8 rounded-lg"
          >
            <div className="w-16 h-16 bg-foreground/10 rounded-lg flex items-center justify-center mb-6">
              <Phone className="h-8 w-8 text-[#FF6B35]" />
            </div>
            <h3 className="text-xl font-bold mb-4 font-montserrat">Ready to Invest in Growth</h3>
            <p className="text-foreground/80">
              You're not just looking to survive—you're committed to growing your business and willing to invest in
              systems that deliver results.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 p-8 rounded-lg"
          >
            <div className="w-16 h-16 bg-foreground/10 rounded-lg flex items-center justify-center mb-6">
              <Truck className="h-8 w-8 text-[#FF6B35]" />
            </div>
            <h3 className="text-xl font-bold mb-4 font-montserrat">Value Your Time</h3>
            <p className="text-foreground/80">
              You understand that your time is valuable and want to focus on doing quality work rather than
              administrative tasks and chasing leads.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
