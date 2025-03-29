import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen pt-20 relative">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      <div className="container mx-auto px-4 py-16">
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
      </div>
    </div>
  )
}

