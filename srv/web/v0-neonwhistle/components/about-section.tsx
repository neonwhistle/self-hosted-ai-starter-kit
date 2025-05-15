"use client"
import { CheckCircle, Target, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function AboutSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  }

  return (
    <section id="about" ref={ref} className="py-20 bg-background relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-neon-purple/10 to-transparent blur-[100px]"></div>
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
            A Straightforward Plan to Grow Your Service Business
          </h2>
          <p className="text-lg text-foreground/80">
            We help service professionals and skilled trades attract better clients, streamline their operations, and
            grow their business without the headaches.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: <Target className="h-6 w-6 text-[#FF6B35]" />,
              title: "Clear Positioning",
              description:
                "Messaging that positions you as the go-to expert in your field, attracting clients who value quality over price.",
            },
            {
              icon: <CheckCircle className="h-6 w-6 text-[#FF6B35]" />,
              title: "Lead Generation",
              description:
                "A simple lead generation system that brings in pre-qualified customers who are ready to hire.",
            },
            {
              icon: <Clock className="h-6 w-6 text-[#FF6B35]" />,
              title: "Time-Saving Automation",
              description:
                "Tools that handle follow-ups, scheduling, and client communications automatically while you focus on what you do best.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 p-8 rounded-lg transition-all duration-300 hover:border-[#FF6B35]/50 hover:shadow-glow group"
            >
              <div className="w-12 h-12 bg-foreground/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-foreground/15 transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 font-montserrat">{item.title}</h3>
              <p className="text-foreground/80">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
