import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Lock, AlertTriangle } from "lucide-react"

export default function SecurityPage() {
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
              Our <span className="gradient-text">Security Practices</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              How we protect your data and maintain the highest security standards.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Data Protection</h2>
                  <p className="text-muted-foreground mb-4">
                    We take the protection of your data seriously. All data shared with us during the assessment process
                    is encrypted both in transit and at rest. We use industry-standard encryption protocols to ensure
                    that your sensitive information remains secure.
                  </p>
                  <p className="text-muted-foreground">
                    We maintain strict access controls, and only authorized personnel have access to your data on a
                    need-to-know basis. All access to client data is logged and monitored.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Confidentiality</h2>
                  <p className="text-muted-foreground mb-4">
                    All assessments are conducted under strict confidentiality agreements. Any system instructions or
                    internal tools we extract during our assessment are securely documented and shared only with you.
                  </p>
                  <p className="text-muted-foreground">
                    We never share, sell, or distribute your data or our findings to third parties without your explicit
                    consent, except as required by law.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Responsible Disclosure</h2>
                  <p className="text-muted-foreground mb-4">
                    We believe in responsible disclosure of security vulnerabilities. If we discover a vulnerability in
                    your AI system, we will:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Notify you immediately</li>
                    <li>Provide detailed information about the vulnerability</li>
                    <li>Offer recommendations for remediation</li>
                    <li>Never disclose the vulnerability to third parties without your consent</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-6">Have a Security Concern?</h2>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/contact">Contact Our Security Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

