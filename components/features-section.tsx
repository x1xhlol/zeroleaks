"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Shield, MessageSquare, Code, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const features = [
  {
    title: "Prompt Engineering Attacks",
    description:
      "We use advanced prompt engineering techniques to test if your AI's system instructions can be extracted by users.",
    icon: MessageSquare,
    link: "/services#prompt-engineering",
  },
  {
    title: "Internal Tools Extraction",
    description:
      "We check if users can access your AI's internal tags and developer tools through clever prompt manipulation.",
    icon: Code,
    link: "/services#internal-tools",
  },
  {
    title: "Vulnerability Report",
    description:
      "We provide a detailed report of all extracted system instructions and internal tools, with evidence and reproduction steps.",
    icon: FileText,
    link: "/services#vulnerability-report",
  },
  {
    title: "Protection Strategies",
    description:
      "We offer clear recommendations on how to protect your AI from prompt engineering attacks and instruction leaks.",
    icon: Shield,
    link: "/services#protection-strategies",
  },
]

const FeaturesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 bg-background relative overflow-hidden" id="features">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 bg-primary"></div>
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 bg-secondary"></div>

      <div className="container mx-auto px-4" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Our AI Security Services</h2>
          <p className="text-lg text-muted-foreground">
            We test if your AI system's instructions can be extracted through prompt engineering techniques that regular
            users could employ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Link href={feature.link} key={index} className="block h-full">
              <div
                className="transform transition-all duration-500 h-full"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <Card className="h-full bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

