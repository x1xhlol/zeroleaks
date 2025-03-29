"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Shield, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { ThemeToggle } from "@/components/theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const mainNavLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Examples", href: "/examples" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
  ]

  const resourcesLinks = [
    { name: "Vulnerability Quiz", href: "/vulnerability-quiz" },
    { name: "ROI Calculator", href: "/roi-calculator" },
    { name: "Certification Program", href: "/certification" },
    { name: "Referral Program", href: "/referral" },
    { name: "Newsletter", href: "/newsletter" },
  ]

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Security", href: "/security" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border/50 shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold gradient-text">ZeroLeaks</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {mainNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-primary/5"
              >
                {link.name}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  Resources <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {resourcesLinks.map((link) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <Link href={link.href}>{link.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  Company <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {companyLinks.map((link) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <Link href={link.href}>{link.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />
            <Button asChild className="bg-primary hover:bg-primary/90 shadow-sm shadow-primary/20 ml-2">
              <Link href="/contact">Test Your AI Security</Link>
            </Button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {mainNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-primary/5"
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}

            <div className="py-2">
              <div className="px-3 py-2 text-sm font-bold text-muted-foreground">Resources</div>
              {resourcesLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 pl-6 text-sm text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-primary/5"
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="py-2">
              <div className="px-3 py-2 text-sm font-bold text-muted-foreground">Company</div>
              {companyLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 pl-6 text-sm text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-primary/5"
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <Button asChild className="w-full mt-4 bg-primary hover:bg-primary/90" onClick={closeMenu}>
              <Link href="/contact">Test Your AI Security</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar

