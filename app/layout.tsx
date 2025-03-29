import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { SkipToContent } from "@/components/skip-to-content"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ZeroLeaks | AI System Instruction & Internal Code Protection",
  description:
    "Protect your AI startup from system instruction exposure and internal code vulnerabilities with ZeroLeaks security solutions.",
  keywords: "AI security, prompt engineering, system instructions, AI protection, prompt injection",
  authors: [{ name: "Lucas Valbuena", url: "https://zeroleaks.vercel.app" }],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#8b5cf6" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex min-h-screen flex-col bg-background">
            <SkipToContent />
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'