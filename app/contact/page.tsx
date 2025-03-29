"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft, Twitter } from "lucide-react"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import the ContactForm component with no SSR
const ContactForm = dynamic(() => import("@/components/contact-form"), {
  ssr: false,
  loading: () => (
    <div className="p-8 bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg">
      <div className="h-8 w-full bg-muted/50 rounded animate-pulse mb-4"></div>
      <div className="h-8 w-full bg-muted/50 rounded animate-pulse mb-4"></div>
      <div className="h-8 w-full bg-muted/50 rounded animate-pulse"></div>
    </div>
  ),
})

export default function ContactPage() {
  // Using useState and useEffect to ensure the component only renders completely on the client
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    // Return a minimal loading state while waiting for client-side hydration
    return (
      <div className="min-h-screen pt-20 relative">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 bg-primary"></div>
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 bg-secondary"></div>

      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Test Your <span className="gradient-text">AI's Security</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Fill out the form below to request a prompt engineering vulnerability assessment for your AI system. We'll
              get back to you within 24 hours.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:contact@lucknite.tech"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      contact@lucknite.tech
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Personal Email</p>
                    <a
                      href="mailto:lucknitelol@proton.me"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      lucknitelol@proton.me
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Twitter className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">X (Twitter)</p>
                    <a
                      href="https://x.com/NotLucknite"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      @NotLucknite
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Emergency Security Support</h3>
              <p className="text-muted-foreground mb-4">
                Already experiencing a security incident with your AI system? Contact our emergency response team
                immediately.
              </p>
              <Button asChild className="w-full">
                <a href="https://x.com/NotLucknite" target="_blank" rel="noopener noreferrer">
                  Contact on X (Twitter)
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

