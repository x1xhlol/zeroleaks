import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, ArrowRight } from "lucide-react"

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 animated-gradient opacity-10"></div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 md:p-12 relative z-10 shadow-lg shadow-primary/5">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Secure Your AI for <span className="gradient-text">Just $299</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't wait for competitors to extract your AI's system instructions. Get a comprehensive security
              assessment today and protect your intellectual property.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 glow-border w-full sm:w-auto">
              <Link href="/contact">
                Start Your Assessment
                <Shield className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/examples">
                See Real Leaks
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection

