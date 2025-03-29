import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Github, Linkedin, Twitter } from "lucide-react"

export default function AboutPage() {
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
              About <span className="gradient-text">ZeroLeaks</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Protecting AI startups from system instruction exposure and internal code vulnerabilities.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-16 w-16 text-primary" />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">Lucas Valbuena</h2>
                <p className="text-primary mb-4">Founder & CEO</p>

                <p className="text-muted-foreground mb-4">
                  Lucas Valbuena is the founder and CEO of ZeroLeaks. With a background in AI security and prompt
                  engineering, Lucas discovered numerous vulnerabilities in popular AI systems that allowed him to
                  extract their system prompts and internal tools.
                </p>

                <p className="text-muted-foreground mb-4">
                  After collecting leaked prompts from a GitHub repository, Lucas realized the widespread vulnerability
                  in AI systems and founded ZeroLeaks to help AI startups protect their intellectual property from
                  similar exposures.
                </p>

                <div className="flex space-x-4 mt-6">
                  <Link
                    href="https://github.com/lucasvalbuena"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://linkedin.com/in/lucasvalbuena"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://twitter.com/lucasvalbuena"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                At ZeroLeaks, our mission is to protect AI startups from system instruction exposure and internal code
                vulnerabilities. We believe that AI companies should be able to innovate without fear of their
                proprietary instructions and tools being extracted through prompt engineering techniques.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
              <p className="text-muted-foreground mb-4">
                We use advanced prompt engineering techniques to test if your AI's system instructions, internal tags,
                and tools can be extracted by users. Our approach is thorough, ethical, and focused on providing
                actionable recommendations to protect your intellectual property.
              </p>
              <p className="text-muted-foreground">
                Unlike traditional security firms, we specialize exclusively in AI system instruction protection, making
                us uniquely qualified to identify and address these specific vulnerabilities.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Why Choose ZeroLeaks</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Specialized expertise in AI system instruction protection</li>
                <li>• Proven track record of identifying vulnerabilities in major AI systems</li>
                <li>• Transparent, affordable pricing with no hidden fees</li>
                <li>• Quick turnaround time for assessments</li>
                <li>• Actionable recommendations that you can implement immediately</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

