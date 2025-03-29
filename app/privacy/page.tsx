import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
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
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground">Last updated: March 25, 2024</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-8">
          <div className="prose prose-invert max-w-none">
            <p>
              At ZeroLeaks, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you visit our website or use our services.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">Information We Collect</h2>
            <p>We collect information that you provide directly to us when you:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Fill out forms on our website</li>
              <li>Subscribe to our newsletter</li>
              <li>Request a security assessment</li>
              <li>Correspond with us by phone, email, or otherwise</li>
            </ul>
            <p>
              The types of information we may collect include your name, email address, phone number, company name, and
              any other information you choose to provide.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">How We Use Your Information</h2>
            <p>We may use the information we collect from you for various purposes, including to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and complete transactions</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Communicate with you about products, services, offers, and events</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">Information Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal
              information. However, please be aware that no method of transmission over the Internet or method of
              electronic storage is 100% secure.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">Third-Party Services</h2>
            <p>
              We may use third-party services that collect, monitor, and analyze data to improve our service's
              functionality. These third parties have their own privacy policies addressing how they use such
              information.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2">
              <strong>Email:</strong> privacy@zeroleaks.ai
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

