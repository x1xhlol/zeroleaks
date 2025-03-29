import { Suspense } from "react"
import { unsubscribeFromNewsletter } from "@/app/actions/subscribe-newsletter"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface UnsubscribeProps {
  searchParams: { token?: string }
}

async function UnsubscribeContent({ token }: { token: string }) {
  const result = await unsubscribeFromNewsletter(token)

  return (
    <Card className="max-w-md mx-auto bg-background/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center">
          {result.success ? (
            <CheckCircle2 className="h-6 w-6 mr-2 text-primary" />
          ) : (
            <AlertCircle className="h-6 w-6 mr-2 text-destructive" />
          )}
          {result.success ? "Unsubscribed Successfully" : "Unsubscribe Failed"}
        </CardTitle>
        <CardDescription>
          {result.success ? "You've been unsubscribed" : "We couldn't process your unsubscribe request"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{result.message || result.error}</p>
        <Button asChild>
          <Link href="/">Return to Homepage</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function UnsubscribePage({ searchParams }: UnsubscribeProps) {
  const token = searchParams.token

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
              <CardDescription>Missing unsubscribe token</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>No unsubscribe token was provided. Please check your email and click the unsubscribe link again.</p>
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
                <CardTitle>Processing Unsubscribe Request</CardTitle>
                <CardDescription>Please wait while we process your request</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              </CardContent>
            </Card>
          }
        >
          <UnsubscribeContent token={token} />
        </Suspense>
      </div>
    </div>
  )
}

