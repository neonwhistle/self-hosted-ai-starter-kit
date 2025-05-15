"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const testimonials = [
  {
    name: "Mike Johnson",
    position: "Owner, Johnson Remodeling",
    content:
      "Before working with Neonwhistle, I was taking any job I could get. Now I'm booked 3 months out with premium projects and charging 40% more. The positioning strategy completely changed how I talk about my business.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    position: "Owner, Chen's Services",
    content:
      "The automated follow-up system alone has saved me 10 hours a week and helped me close 5 more jobs per month. Customers are impressed by how professional and responsive we are now.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    name: "Robert Rodriguez",
    position: "Service Professional",
    content:
      "I was skeptical about marketing. But their approach is practical and focused on results. My website now brings in 3-5 qualified leads every week, and the automation handles all the follow-up.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    name: "David Thompson",
    position: "Business Owner",
    content:
      "The strategy call alone was worth 10x what I paid. They identified exactly where I was losing money in my business and gave me a clear plan to fix it. Six months later, my revenue is up 35%.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const maxIndex = Math.ceil(testimonials.length / 2) - 1

  const nextSlide = () => {
    setCurrentIndex((current) => (current === maxIndex ? 0 : current + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((current) => (current === 0 ? maxIndex : current - 1))
  }

  return (
    <section id="testimonials" ref={ref} className="py-20 bg-background/50 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-neon-purple/10 to-transparent blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-electric-blue/10 to-transparent blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat">What Our Clients Say</h2>
          <p className="text-lg text-foreground/80">
            Don't just take our word for it. Here's what service professionals have to say about working with
            Neonwhistle.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, groupIndex) => (
                <div key={groupIndex} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonials.slice(groupIndex * 2, groupIndex * 2 + 2).map((testimonial, index) => (
                    <Card
                      key={index}
                      className="h-full bg-foreground/5 backdrop-blur-sm border-foreground/10 hover:border-[#FF6B35]/30 transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border border-foreground/10 bg-[#FF6B35]/20 flex items-center justify-center">
                            <span className="text-[#FF6B35] font-bold">
                              {testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-bold font-montserrat">{testimonial.name}</h4>
                            <p className="text-sm text-foreground/60">{testimonial.position}</p>
                          </div>
                        </div>
                        <div className="flex mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < testimonial.rating ? "text-[#FF6B35] fill-[#FF6B35]" : "text-foreground/20"}`}
                            />
                          ))}
                        </div>
                        <p className="text-foreground/80">{testimonial.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center mt-8 gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full border-foreground/20 hover:border-[#FF6B35] hover:bg-foreground/10 text-foreground/80 hover:text-[#FF6B35]"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous testimonials</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full border-foreground/20 hover:border-[#FF6B35] hover:bg-foreground/10 text-foreground/80 hover:text-[#FF6B35]"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next testimonials</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
