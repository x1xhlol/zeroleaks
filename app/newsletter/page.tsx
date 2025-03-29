import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, FileText, Bell } from "lucide-react"
import { NewsletterForm } from "@/components/newsletter-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewsletterPage() {
  const benefits = [
    {
      title: "Security Alerts",
      description: "Be the first to know about new AI vulnerabilities and how to protect your systems",
      icon: Shield,
    },
    {
      title: "Expert Insights",
      description: "Get exclusive articles and insights from our AI security experts",
      icon: FileText,
    },
    {
      title: "Industry Updates",
      description: "Stay informed about the latest trends and developments in AI security",
      icon: Bell,
    },
  ]

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
              ZeroLeaks <span className="gradient-text">Newsletter</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Stay updated with the latest AI security insights, vulnerabilities, and protection strategies.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-background/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-xl mx-auto">
            <NewsletterForm />
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              We respect your privacy. You can unsubscribe at any time.
              <br />
              We send newsletters approximately once per month.
            </p>
            <Button asChild variant="outline">
              <Link href="/blog">Browse Our Blog</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

