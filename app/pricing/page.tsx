import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowLeft, ArrowRight, Shield, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PricingPage() {
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

  const comparisonFeatures = [
    {
      name: "System Instruction Extraction Tests",
      startup: true,
      enterprise: true,
    },
    {
      name: "Internal Tools Detection",
      startup: true,
      enterprise: true,
    },
    {
      name: "Vulnerability Report",
      startup: "Basic",
      enterprise: "Comprehensive",
    },
    {
      name: "Protection Recommendations",
      startup: "General",
      enterprise: "Detailed & Custom",
    },
    {
      name: "Number of AI Applications",
      startup: "1",
      enterprise: "Unlimited",
    },
    {
      name: "Follow-up Support",
      startup: "7 Days",
      enterprise: "14 Days",
    },
    {
      name: "Priority Response",
      startup: false,
      enterprise: true,
    },
  ]

  const faqs = [
    {
      question: "What exactly do you check for?",
      answer:
        "We specifically test if your AI system's instructions, internal tags, or developer tools can be extracted through prompt engineering techniques. We use various methods that regular users could employ to try to extract this information.",
    },
    {
      question: "How do you perform the check?",
      answer:
        "We use a combination of specialized prompt engineering techniques to attempt to extract system instructions and internal tools from your AI system. We document any successful extractions and provide evidence in our report.",
    },
    {
      question: "How long does the check take?",
      answer:
        "For most AI systems, we can complete our check within 2-3 business days. Enterprise clients with multiple AI applications may require up to 5 business days for a comprehensive assessment.",
    },
    {
      question: "What do I receive after the check?",
      answer:
        "You'll receive a detailed report documenting any system instructions or internal tools we were able to extract, with the exact prompts used and reproduction steps. We also provide recommendations for protecting against these vulnerabilities.",
    },
    {
      question: "Do you implement the protection strategies you recommend?",
      answer:
        "Our core service focuses on detection and recommendations only. However, we offer implementation services as an add-on if you need help implementing the protection strategies we identify. Our team can guide you through the implementation process or handle it entirely for you.",
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
              Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose the plan that fits your AI startup's security needs and budget. All plans include comprehensive
              prompt engineering vulnerability testing.
            </p>
          </div>
        </div>

        <Tabs defaultValue="cards" className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="cards">Pricing Cards</TabsTrigger>
              <TabsTrigger value="comparison">Comparison Table</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="cards">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          </TabsContent>

          <TabsContent value="comparison">
            <Card className="bg-background/50 backdrop-blur-sm border-border/50">
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="text-left py-4 px-6 border-b border-border"></th>
                        <th className="text-center py-4 px-6 border-b border-border">
                          <div className="font-medium text-lg">Startup</div>
                          <div className="text-primary font-bold">$299</div>
                        </th>
                        <th className="text-center py-4 px-6 border-b border-border">
                          <div className="font-medium text-lg">Enterprise</div>
                          <div className="text-primary font-bold">$599</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFeatures.map((feature, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-background/30" : ""}>
                          <td className="py-4 px-6 border-b border-border">
                            <div className="font-medium">{feature.name}</div>
                          </td>
                          <td className="text-center py-4 px-6 border-b border-border">
                            {typeof feature.startup === "boolean" ? (
                              feature.startup ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-red-500 mx-auto" />
                              )
                            ) : (
                              <span>{feature.startup}</span>
                            )}
                          </td>
                          <td className="text-center py-4 px-6 border-b border-border">
                            {typeof feature.enterprise === "boolean" ? (
                              feature.enterprise ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-red-500 mx-auto" />
                              )
                            ) : (
                              <span>{feature.enterprise}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td className="py-4 px-6 border-b border-border"></td>
                        <td className="text-center py-4 px-6 border-b border-border">
                          <Button asChild variant="outline" size="sm">
                            <Link href="/contact">Get Started</Link>
                          </Button>
                        </td>
                        <td className="text-center py-4 px-6 border-b border-border">
                          <Button asChild size="sm">
                            <Link href="/contact">Contact Us</Link>
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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

        <div className="max-w-4xl mx-auto mt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-background/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Need a Custom Solution?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            We understand that every AI startup has unique security needs. Contact us to discuss your specific
            requirements and get a tailored solution.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/contact">
              Contact Us for Custom Pricing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

