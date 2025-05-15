import type React from "react"
import "./globals.css"
import { Poppins, Montserrat } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
})

export const metadata = {
  title: "Neonwhistle - Digital Agency",
  description: "Accelerate Your Digital Future with Neonwhistle",
  metadataBase: new URL("https://neonwhistle.com"),
  openGraph: {
    title: "Neonwhistle - Digital Agency",
    description: "Accelerate Your Digital Future with Neonwhistle",
    url: "https://neonwhistle.com",
    siteName: "Neonwhistle",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neonwhistle - Digital Agency",
    description: "Accelerate Your Digital Future with Neonwhistle",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${montserrat.variable} font-poppins bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
