import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Shield, Award, BadgeCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CertificationPage() {
  const certificationLevels = [
    {
      name: "Basic Certification",
      description: "Verify that your AI system has basic protections against prompt engineering attacks",
      price: "$399",
      features: [
        "System instruction extraction test",
        "Basic vulnerability assessment",
        "Digital certification badge",
        "Listing in ZeroLeaks directory",
        "Valid forever",
      ],
      icon: Shield,
    },
    {
      name: "Advanced Certification",
      description:
        "Comprehensive verification of your AI system's security against all known prompt engineering techniques",
      price: "$799",
      features: [
        "Everything in Basic Certification",
        "Advanced vulnerability assessment",
        "Detailed security recommendations",
        "Priority re-certification",
        "Valid forever",
      ],
      icon: Award,
    },
    {
      name: "Enterprise Certification",
      description: "The highest level of certification for mission-critical AI systems",
      price: "$1,999",
      features: [
        "Everything in Advanced Certification",
        "Custom security assessment",
        "Quarterly vulnerability testing",
        "Dedicated security consultant",
        "Valid forever",
      ],
      icon: BadgeCheck,
    },
  ]

  const benefits = [
    {
      title: "Build Customer Trust",
      description: "Show your customers that you take AI security seriously with a recognized certification",
      icon: CheckCircle,
    },
    {
      title: "Competitive Advantage",
      description: "Differentiate your AI product from competitors with verified security credentials",
      icon: Award,
    },
    {
      title: "Reduce Security Risks",
      description: "Identify and address vulnerabilities before they can be exploited",
      icon: Shield,
    },
    {
      title: "Marketing Asset",
      description: "Use your certification in marketing materials to highlight your commitment to security",
      icon: BadgeCheck,
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
              ZeroLeaks <span className="gradient-text">Certification Program</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Demonstrate your commitment to AI security with our industry-recognized certification program.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Why Get Certified?</h2>
              <p className="text-muted-foreground mb-6">
                In today's competitive AI landscape, security is a key differentiator. The ZeroLeaks Certification
                Program verifies that your AI system is protected against prompt engineering attacks that could expose
                your system instructions and internal tools.
              </p>
              <p className="text-muted-foreground">
                Our certification is recognized across the industry as the standard for AI prompt security, giving your
                customers confidence that their data and your intellectual property are protected.
              </p>
            </div>
            <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 flex items-center justify-center">
              <div className="text-center">
                <BadgeCheck className="h-16 w-16 text-primary mx-auto mb-4" />
                <div className="text-xl font-bold mb-2">ZeroLeaks Certified</div>
                <div className="text-sm text-muted-foreground">Protected Against Prompt Engineering Attacks</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Certification Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-background/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <benefit.icon className="h-5 w-5 text-primary mr-2" />
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Certification Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificationLevels.map((level, index) => (
              <Card key={index} className="bg-background/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <level.icon className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-center">{level.name}</CardTitle>
                  <CardDescription className="text-center">{level.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <span className="text-2xl font-bold">{level.price}</span>
                  </div>
                  <ul className="space-y-2">
                    {level.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/contact">Apply for Certification</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

