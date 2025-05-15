"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { X, Clock, DollarSign } from "lucide-react"

export function ProblemSection() {
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
    <section id="problem" ref={ref} className="py-20 bg-background/50 relative">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat">
            Stop Chasing Low-Quality Jobs That Waste Your Time
          </h2>
          <p className="text-lg text-foreground/80">
            You're great at what you do. But running a successful service business takes more than just skill.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 p-8 rounded-lg transition-all duration-300 hover:border-[#FF6B35]/50 hover:shadow-glow"
          >
            <div className="w-12 h-12 bg-foreground/10 rounded-lg flex items-center justify-center mb-6">
              <DollarSign className="h-6 w-6 text-[#FF6B35]" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-montserrat">Competing on Price</h3>
            <p className="text-foreground/80">
              Tired of competing on price with unreliable customers who don't value quality work?
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 p-8 rounded-lg transition-all duration-300 hover:border-[#FF6B35]/50 hover:shadow-glow"
          >
            <div className="w-12 h-12 bg-foreground/10 rounded-lg flex items-center justify-center mb-6">
              <Clock className="h-6 w-6 text-[#FF6B35]" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-montserrat">Administrative Burden</h3>
            <p className="text-foreground/80">
              Spending too much time on paperwork, quotes, and follow-ups instead of billable work?
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 p-8 rounded-lg transition-all duration-300 hover:border-[#FF6B35]/50 hover:shadow-glow"
          >
            <div className="w-12 h-12 bg-foreground/10 rounded-lg flex items-center justify-center mb-6">
              <X className="h-6 w-6 text-[#FF6B35]" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-montserrat">Missed Opportunities</h3>
            <p className="text-foreground/80">
              Missing calls while you're on the job site, leading to lost business and frustrated customers?
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4 font-montserrat">
            There's a better way to run your service business.
          </h3>
        </motion.div>
      </div>
    </section>
  )
}
