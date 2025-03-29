import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, MessageSquare, Code, Key, FileText, ArrowLeft, ArrowRight } from "lucide-react"
import { ROICalculator } from "@/components/roi-calculator"

export default function ServicesPage() {
  const services = [
    {
      id: "prompt-engineering",
      title: "Prompt Engineering Attack Tests",
      description:
        "We test if users can extract your AI's system instructions through clever prompt engineering techniques.",
      icon: MessageSquare,
      details: [
        "Multiple prompt injection techniques",
        "System instruction extraction attempts",
        "Role-playing and impersonation attacks",
        "Jailbreaking attempts",
        "Documentation of successful extraction methods",
      ],
    },
    {
      id: "internal-tools",
      title: "Internal Tags & Tools Detection",
      description:
        "We check if your AI exposes internal developer tools or tags that could reveal how your system works.",
      icon: Code,
      details: [
        "Internal tool discovery attempts",
        "Developer command extraction",
        "Configuration data extraction",
        "Internal tag exposure identification",
        "Documentation of all exposed internal tools",
      ],
    },
    {
      id: "vulnerability-report",
      title: "Vulnerability Report & Recommendations",
      description:
        "We provide a detailed report with specific recommendations to protect your AI from prompt engineering attacks.",
      icon: FileText,
      details: [
        "Documentation of all extracted information",
        "Exact prompts used for successful extractions",
        "Severity assessment of each vulnerability",
        "Specific protection recommendations",
        "Comparison with industry best practices",
      ],
    },
    {
      id: "protection-strategies",
      title: "Protection Implementation (Add-on)",
      description: "Need help implementing protection? Our implementation services start at just $499.",
      icon: Key,
      details: [
        "Guided implementation of prompt injection defenses",
        "System instruction protection strategies",
        "Internal tool access control setup",
        "Prompt validation implementation",
        "Post-implementation verification testing",
      ],
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
              Our <span className="gradient-text">Security Services</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We test if your AI system's instructions can be extracted through prompt engineering techniques that
              regular users could employ.
            </p>
          </div>
        </div>

        <div className="space-y-16">
          {services.map((service, index) => (
            <div key={service.id} id={service.id} className="scroll-mt-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className={index % 2 === 0 ? "" : "lg:order-2"}>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">{service.title}</h2>
                    <p className="text-lg text-muted-foreground">{service.description}</p>

                    <ul className="space-y-2 mt-6">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                            <Shield className="h-3 w-3 text-primary" />
                          </div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={index % 2 === 0 ? "lg:order-2" : ""}>
                  <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 h-64 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-float">
                      <service.icon className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Calculate Your <span className="gradient-text">ROI</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              See how much you could save by protecting your AI system from prompt engineering attacks.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ROICalculator />
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Secure Your AI Systems?</h2>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/contact">
              Request an Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

