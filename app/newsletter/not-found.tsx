import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function NewsletterNotFound() {
  return (
    <div className="container py-12">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-6 w-6 mr-2 text-destructive" />
            Page Not Found
          </CardTitle>
          <CardDescription>The newsletter page you're looking for doesn't exist</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The page you're trying to access could not be found. If you're trying to confirm your subscription, please
            check the link in your email and try again.
          </p>
          <Button asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

