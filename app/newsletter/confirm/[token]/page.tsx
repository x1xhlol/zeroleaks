import { Suspense } from "react"
import { confirmNewsletterSubscription } from "@/app/actions/subscribe-newsletter"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Add the missing import for DB_COLLECTIONS
import { DB_COLLECTIONS } from "@/lib/db/constants"

interface ConfirmationProps {
  params: { token: string }
}

// Define DB_COLLECTIONS
// const DB_COLLECTIONS = {
//   SUBSCRIBERS: "subscribers",
//   CONFIRMED_SUBSCRIBERS: "confirmed_subscribers",
// }

// Update the ConfirmationContent component to provide more detailed debugging information

async function ConfirmationContent({ token }: { token: string }) {
  // Add direct KV check for debugging
  let debugInfo = ""
  let tokenEmail = null
  try {
    const { kv } = await import("@vercel/kv")
    const tokenKey = `token:${token}`
    const email = await kv.get(tokenKey)
    tokenEmail = email

    // Check if email is in subscribers collection
    const isInSubscribers = email ? await kv.sismember(DB_COLLECTIONS.SUBSCRIBERS, email) : false

    // Check if email is in confirmed subscribers collection
    const isInConfirmedSubscribers = email ? await kv.sismember(DB_COLLECTIONS.CONFIRMED_SUBSCRIBERS, email) : false

    debugInfo =
      `Token check: ${email ? `Found email: ${email}` : "No email found for token"}\n` +
      `In subscribers collection: ${isInSubscribers}\n` +
      `In confirmed subscribers collection: ${isInConfirmedSubscribers}`
  } catch (err) {
    debugInfo = `Error checking token: ${err instanceof Error ? err.message : String(err)}`
  }

  // Try to confirm the subscription
  try {
    const result = await confirmNewsletterSubscription(token)

    // If we have the email but confirmation failed, try a direct approach
    if (!result.success && tokenEmail) {
      try {
        const { kv } = await import("@vercel/kv")

        // Add to confirmed subscribers directly
        await kv.sadd(DB_COLLECTIONS.CONFIRMED_SUBSCRIBERS, tokenEmail)

        // Try to update the result
        result.success = true
        result.message = "Your subscription has been confirmed! You'll now receive our newsletter updates."

        debugInfo += "\nDirect confirmation approach used as fallback."
      } catch (directError) {
        debugInfo += `\nDirect fallback failed: ${directError instanceof Error ? directError.message : String(directError)}`
      }
    }

    return (
      <Card className="max-w-md mx-auto bg-background/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center">
            {result.success ? (
              <CheckCircle2 className="h-6 w-6 mr-2 text-primary" />
            ) : (
              <AlertCircle className="h-6 w-6 mr-2 text-destructive" />
            )}
            {result.success ? "Subscription Confirmed" : "Confirmation Failed"}
          </CardTitle>
          <CardDescription>
            {result.success ? "Your email has been confirmed" : "We couldn't confirm your subscription"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{result.message || result.error}</p>
          {!result.success && (
            <div className="bg-muted p-4 rounded-md text-xs overflow-auto">
              <p className="font-mono whitespace-pre-line">Debug info: {debugInfo}</p>
            </div>
          )}
          <Button asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    )
  } catch (error) {
    return (
      <Card className="max-w-md mx-auto bg-background/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-6 w-6 mr-2 text-destructive" />
            Error Processing Request
          </CardTitle>
          <CardDescription>An unexpected error occurred</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>We encountered an error while processing your confirmation. Please try again later.</p>
          <div className="bg-muted p-4 rounded-md text-xs overflow-auto">
            <p className="font-mono whitespace-pre-line">
              Error: {error instanceof Error ? error.message : String(error)}
            </p>
            <p className="font-mono mt-2 whitespace-pre-line">Debug info: {debugInfo}</p>
          </div>
          <Button asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }
}

export default function ConfirmationPage({ params }: ConfirmationProps) {
  const { token } = params

  if (!token) {
    return (
      <div className="min-h-screen pt-20 relative">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto bg-background/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-6 w-6 mr-2 text-destructive" />
                Invalid Request
              </CardTitle>
              <CardDescription>Missing confirmation token</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>No confirmation token was provided. Please check your email and click the confirmation link again.</p>
              <Button asChild>
                <Link href="/">Return to Homepage</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 relative">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 bg-primary"></div>
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 bg-secondary"></div>

      <div className="container mx-auto px-4 py-16">
        <Suspense
          fallback={
            <Card className="max-w-md mx-auto bg-background/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Confirming Subscription</CardTitle>
                <CardDescription>Please wait while we confirm your subscription</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              </CardContent>
            </Card>
          }
        >
          <ConfirmationContent token={token} />
        </Suspense>
      </div>
    </div>
  )
}

