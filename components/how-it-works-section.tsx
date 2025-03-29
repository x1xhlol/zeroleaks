"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { MessageSquare, FileText, Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const steps = [
  {
    id: 1,
    title: "Initial Setup",
    description: "Provide us with access to your AI system so we can begin our prompt engineering tests.",
    icon: MessageSquare,
  },
  {
    id: 2,
    title: "Prompt Engineering Tests",
    description:
      "We use specialized prompt techniques to attempt extracting your AI's system instructions and internal tools.",
    icon: Shield,
  },
  {
    id: 3,
    title: "Detailed Report",
    description:
      "We deliver a comprehensive report documenting any system instructions or internal tools we were able to extract.",
    icon: FileText,
  },
]

const HowItWorksSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 bg-background relative overflow-hidden" id="how-it-works">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>

      <div className="container mx-auto px-4" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How <span className="gradient-text">ZeroLeaks</span> Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Our straightforward process helps identify if your AI's system instructions can be extracted through prompt
            engineering.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-secondary/50 hidden md:block"></div>

            {steps.map((step, index) => (
              <div
                key={step.id}
                className="relative mb-16 last:mb-0"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  transitionDelay: `${index * 200}ms`,
                }}
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:order-2 md:pl-12"}`}>
                    <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                      <h3 className="text-xl font-bold mb-2 flex items-center md:justify-end">
                        {index % 2 === 0 ? (
                          <>
                            {step.title}
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold ml-3">
                              {step.id}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold mr-3">
                              {step.id}
                            </span>
                            {step.title}
                          </>
                        )}
                      </h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center justify-center z-10 absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:order-2 md:pl-12" : "md:pr-12"}`}>
                    {/* Empty div for layout */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/how-it-works">
              Learn More About Our Process
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection

