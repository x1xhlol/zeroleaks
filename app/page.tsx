import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import LeakExamplesSection from "@/components/leak-examples-section"
import HowItWorksSection from "@/components/how-it-works-section"
import PricingSection from "@/components/pricing-section"
import CTASection from "@/components/cta-section"
import { VulnerabilityQuiz } from "@/components/vulnerability-quiz"
import { ROICalculator } from "@/components/roi-calculator"
import { NewsletterForm } from "@/components/newsletter-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Award, Users } from "lucide-react"

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />

      {/* Problem-Solution Narrative Section */}
      <section className="py-20 bg-background/80 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The <span className="gradient-text">Problem</span> and Our <span className="gradient-text">Solution</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              AI systems are vulnerable to prompt engineering attacks that can expose your proprietary system
              instructions.
            </p>
          </div>
        </div>
      </section>

      <LeakExamplesSection />

      {/* Vulnerability Quiz Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How <span className="gradient-text">Vulnerable</span> Is Your AI?
            </h2>
            <p className="text-lg text-muted-foreground">
              Take our quick quiz to get a basic assessment of your AI system's vulnerability to prompt engineering
              attacks.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <VulnerabilityQuiz />
          </div>
        </div>
      </section>

      <HowItWorksSection />

      {/* ROI Calculator Section */}
      <section className="py-20 bg-background/80 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4">
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
      </section>

      <PricingSection />

      {/* Programs Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="gradient-text">Programs</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore our additional programs designed to help you maximize AI security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-8 text-center">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Certification Program</h3>
              <p className="text-muted-foreground mb-6">
                Get your AI system certified as secure against prompt engineering attacks and build customer trust.
              </p>
              <Button asChild>
                <Link href="/certification">Learn More</Link>
              </Button>
            </div>

            <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-8 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Referral Program</h3>
              <p className="text-muted-foreground mb-6">
                Earn rewards by referring companies that need AI security testing.
              </p>
              <Button asChild>
                <Link href="/referral">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-background/80 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay <span className="gradient-text">Updated</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Subscribe to our newsletter for the latest AI security insights and updates.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}

