"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2, Users, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { sendContactEmail, type ContactFormData } from "@/app/actions/send-email"

// Create a simple custom hook instead of using useSearchParams
const useQueryParam = (param: string): string | null => {
  const [value, setValue] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      setValue(params.get(param))
    }
  }, [param])

  return value
}

const ContactForm = () => {
  const referralSource = useQueryParam("ref")

  const [formState, setFormState] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    aiType: "",
    message: "",
    referralSource: "",
    referrerName: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedAiType, setSelectedAiType] = useState<string>("")

  // Set referral source from URL parameter
  useEffect(() => {
    if (referralSource) {
      setFormState((prev) => ({ ...prev, referralSource }))
    }
  }, [referralSource])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedAiType(value)
    setFormState((prev) => ({ ...prev, aiType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Send email using the server action
      const result = await sendContactEmail(formState)

      if (result.success) {
        setIsSubmitted(true)
        // Reset form after showing success message
        setTimeout(() => {
          setFormState({
            name: "",
            email: "",
            company: "",
            aiType: "",
            message: "",
            referralSource: "",
            referrerName: "",
          })
          setSelectedAiType("")
          setIsSubmitted(false)
        }, 5000)
      } else {
        setError(result.error || "Failed to send your message. Please try again.")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.")
      console.error("Form submission error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 md:p-8">
      {isSubmitted ? (
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-muted-foreground">
            Your security assessment request has been received. We'll contact you shortly to discuss your AI security
            needs.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {referralSource === "referral" && (
            <Alert className="bg-primary/10 border-primary/20">
              <AlertDescription className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-primary" />
                You've been referred by someone! Please provide their name to ensure they receive credit.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@company.com"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                name="company"
                placeholder="AI Startup Inc."
                value={formState.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aiType">AI System Type</Label>
              <select
                id="aiType"
                name="aiType"
                value={selectedAiType}
                onChange={handleSelectChange}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="" disabled>
                  Select AI type
                </option>
                <option value="chatbot">AI Chatbot / Assistant</option>
                <option value="generative">Generative AI</option>
                <option value="coding">AI Coding Assistant</option>
                <option value="search">AI Search Engine</option>
                <option value="other">Other AI System</option>
              </select>
            </div>
          </div>

          {referralSource === "referral" && (
            <div className="space-y-2">
              <Label htmlFor="referrerName">Referrer's Name</Label>
              <Input
                id="referrerName"
                name="referrerName"
                placeholder="Who referred you to us?"
                value={formState.referrerName}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">Tell us about your AI system</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Please describe your AI system and how we can access it for our assessment..."
              rows={5}
              value={formState.message}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Request Prompt Engineering Test"
            )}
          </Button>
        </form>
      )}
    </div>
  )
}

export default ContactForm

