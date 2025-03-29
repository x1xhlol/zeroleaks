import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, MessageSquare, Shield } from "lucide-react"

export default function HowItWorksPage() {
  const steps = [
    {
      id: 1,
      title: "Initial Setup",
      description: "We begin by collecting information about your AI system and setting up access for our assessment.",
      icon: CheckCircle2,
      details: [
        "Provide access to your AI system",
        "Brief overview of your AI's functionality",
        "Define the scope of the assessment",
        "Sign our confidentiality agreement",
      ],
    },
    {
      id: 2,
      title: "Prompt Engineering Tests",
      description:
        "Our team uses specialized prompt engineering techniques to attempt extracting your AI's system instructions and internal tools.",
      icon: MessageSquare,
      details: [
        "System instruction extraction attempts",
        "Internal tags and tools discovery",
        "Role-playing and impersonation attacks",
        "Jailbreaking attempts",
        "Prompt injection techniques",
      ],
    },
    {
      id: 3,
      title: "Detailed Report",
      description:
        "We deliver a comprehensive report documenting any system instructions or internal tools we were able to extract.",
      icon: FileText,
      details: [
        "Documentation of all extracted information",
        "Exact prompts used for successful extractions",
        "Severity assessment of each vulnerability",
        "Screenshots and examples",
        "Comparison with similar AI systems",
      ],
    },
    {
      id: 4,
      title: "Protection Recommendations",
      description: "We provide clear recommendations on how to protect your AI from prompt engineering attacks.",
      icon: Shield,
      details: [
        "Specific technical recommendations",
        "Prompt injection defense strategies",
        "System instruction protection methods",
        "Internal tool access control improvements",
        "Follow-up support during implementation",
      ],
    },
  ]

  const faqs = [
    {
      question: "How long does the assessment process take?",
      answer:
        "For most AI systems, we can complete our check within 2-3 business days. Enterprise clients with multiple AI applications may require up to 5 business days for a comprehensive assessment.",
    },
    {
      question: "Do you need access to our source code?",
      answer:
        "No, we don't need access to your source code. We only need access to your AI system's interface, similar to how a regular user would interact with it.",
    },
    {
      question: "How do you ensure the confidentiality of our information?",
      answer:
        "We take confidentiality extremely seriously. All assessments are conducted under strict NDAs, and any system instructions or internal tools we extract are securely documented and shared only with you.",
    },
    {
      question: "What happens if you don't find any vulnerabilities?",
      answer:
        "If we don't find any way to extract your system instructions or internal tools, we'll provide a report confirming this and suggestions for maintaining your security posture. We offer a satisfaction guarantee - if we don't find any vulnerabilities, we'll provide a 50% refund.",
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
              How <span className="gradient-text">ZeroLeaks</span> Works
            </h1>
            <p className="text-lg text-muted-foreground">
              Our comprehensive process helps identify if your AI's system instructions can be extracted through prompt
              engineering.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-secondary/50 hidden md:block"></div>

            {steps.map((step, index) => (
              <div key={step.id} className="relative mb-16 last:mb-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-24 flex-shrink-0 flex items-start justify-center z-10">
                    <div className="w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0">
                    <h2 className="text-2xl font-bold mb-4 flex items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold mr-3">
                        {step.id}
                      </span>
                      {step.title}
                    </h2>

                    <p className="text-lg text-muted-foreground mb-6">{step.description}</p>

                    <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-4">What This Includes:</h3>
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                              <CheckCircle2 className="h-3 w-3 text-primary" />
                            </div>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
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

