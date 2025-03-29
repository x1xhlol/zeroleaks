"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Shield, ExternalLink } from "lucide-react"

const tiers = [
  {
    name: "Startup",
    description: "For early-stage AI startups",
    price: "$299",
    features: [
      "System Instruction Extraction Tests",
      "Internal Tools Detection",
      "Basic Vulnerability Report",
      "7-Day Follow-up Support",
      "1 AI Application",
    ],
    cta: "Get Started",
    popular: false,
    href: "/contact",
  },
  {
    name: "Enterprise",
    description: "For established AI companies",
    price: "$599",
    features: [
      "Everything in Startup",
      "Comprehensive Vulnerability Report",
      "Detailed Protection Recommendations",
      "Unlimited AI Applications",
      "14-Day Follow-up Support",
      "Priority Response",
    ],
    cta: "Contact Us",
    popular: true,
    href: "/contact",
  },
]

const PricingSection = () => {
  return (
    <section className="py-20 bg-background/80 relative overflow-hidden" id="pricing">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Pricing Plans
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your AI startup's security needs and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 ${
                tier.popular ? "border-primary" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground ml-1">one-time</span>
                </div>

                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  asChild
                  className={`w-full ${tier.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                  variant={tier.popular ? "default" : "outline"}
                >
                  <Link href={tier.href}>
                    {tier.cta}
                    {tier.popular && <Shield className="ml-2 h-4 w-4" />}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 max-w-4xl mx-auto bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Protection Implementation</h3>
          <p className="text-muted-foreground mb-6">
            Need help implementing the protection strategies we recommend? Our implementation services are available as
            an add-on:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-background/80 p-4 rounded-lg border border-border">
              <h4 className="font-medium mb-2">Basic Implementation</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Guided implementation of critical protection measures
              </p>
              <p className="font-bold">$499</p>
            </div>
            <div className="bg-background/80 p-4 rounded-lg border border-border">
              <h4 className="font-medium mb-2">Complete Implementation</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Full implementation of all recommended security measures
              </p>
              <p className="font-bold">$899</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Need a custom solution for your specific AI security needs?</p>
          <Button asChild variant="outline">
            <Link href="/contact">
              Contact Us for Custom Pricing
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default PricingSection

