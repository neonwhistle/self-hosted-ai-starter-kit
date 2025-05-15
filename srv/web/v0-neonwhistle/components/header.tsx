"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border/20" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold font-montserrat bg-gradient-to-r from-electric-blue via-neon-purple to-neon-teal bg-clip-text text-transparent"
            >
              Neonwhistle
            </Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {[
                { name: "How It Works", href: "#how-it-works" },
                { name: "Services", href: "#packages" },
                { name: "Who It's For", href: "#ideal-client" },
                { name: "Testimonials", href: "#testimonials" },
                { name: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-foreground/80 hover:text-[#FF6B35] transition-colors duration-300 text-sm font-medium tracking-wide"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block">
            <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/80 text-black font-medium">Book Strategy Call</Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground/80 hover:text-[#FF6B35] focus:outline-none transition-colors duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {[
              { name: "How It Works", href: "#how-it-works" },
              { name: "Services", href: "#packages" },
              { name: "Who It's For", href: "#ideal-client" },
              { name: "Testimonials", href: "#testimonials" },
              { name: "Contact", href: "#contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-[#FF6B35] hover:bg-foreground/5 rounded-md transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <Button className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/80 text-black font-medium">
                Book Strategy Call
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
