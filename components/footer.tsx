import Link from "next/link"
import { Shield, Twitter, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold gradient-text">ZeroLeaks</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Protecting AI startups from system instruction exposure and internal code vulnerabilities.
            </p>
            <div className="flex items-center space-x-2 pt-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com/ZeroLeaksAI" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://www.linkedin.com/company/zero-leaks/" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com/ZeroLeaks" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services#prompt-engineering"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Prompt Engineering Tests
                </Link>
              </li>
              <li>
                <Link
                  href="/services#internal-tools"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Internal Tools Detection
                </Link>
              </li>
              <li>
                <Link
                  href="/services#vulnerability-report"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Vulnerability Reports
                </Link>
              </li>
              <li>
                <Link
                  href="/services#protection-strategies"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Protection Implementation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/vulnerability-quiz"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Vulnerability Quiz
                </Link>
              </li>
              <li>
                <Link
                  href="/roi-calculator"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  ROI Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/certification"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Certification Program
                </Link>
              </li>
              <li>
                <Link href="/referral" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Referral Program
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ZeroLeaks. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Get a Security Assessment
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

