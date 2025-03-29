"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Loader2, Mail, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { subscribeToNewsletter } from "@/app/actions/subscribe-newsletter"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [response, setResponse] = useState<{
    success?: boolean
    message?: string
    error?: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResponse(null)

    try {
      const result = await subscribeToNewsletter(email)
      setResponse(result)

      if (result.success) {
        // Clear the form if successful
        setEmail("")

        // Reset the form after 5 seconds
        setTimeout(() => {
          setResponse(null)
        }, 5000)
      }
    } catch (error) {
      setResponse({
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-background/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mail className="h-5 w-5 mr-2 text-primary" />
          Subscribe to Our Newsletter
        </CardTitle>
        <CardDescription>
          Get the latest AI security insights, tips, and updates delivered to your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {response?.success ? (
          <div className="text-center py-4">
            <CheckCircle2 className="h-10 w-10 text-primary mx-auto mb-2" />
            <p className="font-medium">Thank you!</p>
            <p className="text-sm text-muted-foreground">{response.message}</p>
          </div>
        ) : (
          <>
            {response?.error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{response.error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
                disabled={isSubmitting}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          </>
        )}
      </CardContent>
    </Card>
  )
}

