"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function UnsubscribedPage() {
  const searchParams = useSearchParams()
  const success = searchParams.get("success") === "true"
  const error = searchParams.get("error")
  const message = searchParams.get("message")

  return (
    <div className="min-h-screen pt-20 relative">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 bg-primary"></div>
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 bg-secondary"></div>

      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto bg-background/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              {success ? (
                <CheckCircle2 className="h-6 w-6 mr-2 text-primary" />
              ) : (
                <AlertCircle className="h-6 w-6 mr-2 text-destructive" />
              )}
              {success ? "Unsubscribed Successfully" : "Unsubscribe Failed"}
            </CardTitle>
            <CardDescription>
              {success ? "You've been unsubscribed" : "We couldn't process your unsubscribe request"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{message || getErrorMessage(error)}</p>
            <Button asChild>
              <Link href="/">Return to Homepage</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function getErrorMessage(error: string | null): string {
  switch (error) {
    case "missing-token":
      return "No unsubscribe token was provided. Please check your email and click the unsubscribe link again."
    case "server-error":
      return "An unexpected error occurred. Please try again later."
    default:
      return error || "An unknown error occurred. Please try again later."
  }
}

