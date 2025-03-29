import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen pt-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>

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
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-lg text-muted-foreground">Last updated: March 25, 2024</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-8">
          <div className="prose prose-invert max-w-none">
            <p>
              Please read these Terms of Service ("Terms") carefully before using the ZeroLeaks website or services.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of
              the terms, you may not access our services.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">2. Description of Services</h2>
            <p>
              ZeroLeaks provides AI security assessment services that test if your AI system's instructions, internal
              tags, or developer tools can be extracted through prompt engineering techniques.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">3. Use of Services</h2>
            <p>
              You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not
              to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Use our services in any way that violates any applicable law or regulation</li>
              <li>Use our services to attempt to gain unauthorized access to any system, network, or data</li>
              <li>Use our findings or reports to harm others or for malicious purposes</li>
              <li>Share, sell, or distribute our reports or findings without our explicit permission</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">4. Intellectual Property</h2>
            <p>
              All content, features, and functionality of our services, including but not limited to text, graphics,
              logos, and software, are owned by ZeroLeaks and are protected by copyright, trademark, and other
              intellectual property laws.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">5. Confidentiality</h2>
            <p>
              We treat all information about your AI systems and any vulnerabilities we discover as confidential. We
              will not disclose this information to third parties without your explicit consent, except as required by
              law.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">6. Limitation of Liability</h2>
            <p>
              In no event shall ZeroLeaks be liable for any indirect, incidental, special, consequential, or punitive
              damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
              resulting from your access to or use of or inability to access or use the services.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of any significant changes
              by updating the "Last updated" date at the top of these Terms.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">8. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p className="mt-2">
              <strong>Email:</strong> legal@zeroleaks.ai
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

