import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background/80 backdrop-blur-md border-t border-foreground/10 text-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold font-montserrat bg-gradient-to-r from-electric-blue via-neon-purple to-neon-teal bg-clip-text text-transparent inline-block mb-4"
            >
              Neonwhistle
            </Link>
            <p className="text-foreground/70 mb-6 max-w-md">
              Helping service professionals get better leads, win more jobs, and save more time through strategic
              marketing and business automation.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-foreground/60 hover:text-[#FF6B35] transition-colors duration-300">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-foreground/60 hover:text-[#FF6B35] transition-colors duration-300">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-foreground/60 hover:text-[#FF6B35] transition-colors duration-300">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-foreground/60 hover:text-[#FF6B35] transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 font-montserrat">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#packages"
                  className="text-foreground/70 hover:text-[#FF6B35] transition-colors duration-300"
                >
                  Strategy Calls
                </Link>
              </li>
              <li>
                <Link
                  href="#packages"
                  className="text-foreground/70 hover:text-[#FF6B35] transition-colors duration-300"
                >
                  Custom Websites
                </Link>
              </li>
              <li>
                <Link
                  href="#packages"
                  className="text-foreground/70 hover:text-[#FF6B35] transition-colors duration-300"
                >
                  Business Automation
                </Link>
              </li>
              <li>
                <Link
                  href="#packages"
                  className="text-foreground/70 hover:text-[#FF6B35] transition-colors duration-300"
                >
                  Lead Generation
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-foreground/70 hover:text-[#FF6B35] transition-colors duration-300"
                >
                  Custom Solutions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 font-montserrat">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-foreground/70 hover:text-[#FF6B35] transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="text-foreground/70 hover:text-[#FF6B35] transition-colors duration-300"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-[#FF6B35] transition-colors duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-[#FF6B35] transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-[#FF6B35] transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-foreground/10 mt-12 pt-8 text-center text-foreground/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Neonwhistle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
