import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, Gift, DollarSign, Mail, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReferralPage() {
  const steps = [
    {
      title: "Refer a Company",
      description: "Share ZeroLeaks with companies that could benefit from AI security testing",
      icon: Users,
    },
    {
      title: "They Get Protected",
      description: "When your referral purchases any ZeroLeaks service",
      icon: Shield,
    },
    {
      title: "You Earn Rewards",
      description: "Receive your referral bonus or credit toward future services",
      icon: Gift,
    },
  ]

  const rewards = [
    {
      title: "Cash Rewards",
      description: "Earn 15% of your referral's first purchase amount in cash",
      icon: DollarSign,
    },
    {
      title: "Service Credits",
      description: "Choose to receive 20% of your referral's first purchase as credit toward your next service",
      icon: Gift,
    },
    {
      title: "Unlimited Referrals",
      description: "There's no limit to how many companies you can refer or how much you can earn",
      icon: Users,
    },
  ]

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
              ZeroLeaks <span className="gradient-text">Referral Program</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Earn rewards by referring companies that need AI security testing.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Why Refer?</h2>
              <p className="text-muted-foreground mb-6">
                You know the importance of AI security, and you probably know other companies that could benefit from
                our services. Our referral program rewards you for helping protect the AI ecosystem while earning
                valuable rewards.
              </p>
              <p className="text-muted-foreground">
                Whether you choose cash rewards or service credits, our referral program is designed to thank you for
                spreading the word about AI security.
              </p>
            </div>
            <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Quick Example</h3>
              <div className="space-y-4">
                <div className="bg-background/70 p-4 rounded-lg border border-border">
                  <p className="text-sm">You refer a company that purchases our Enterprise package ($599)</p>
                </div>
                <div className="bg-background/70 p-4 rounded-lg border border-border">
                  <p className="text-sm">
                    You earn <span className="font-bold text-primary">$89.85</span> in cash rewards (15%)
                  </p>
                  <p className="text-sm">OR</p>
                  <p className="text-sm">
                    <span className="font-bold text-primary">$119.80</span> in service credits (20%)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="bg-background/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-center">Step {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <h3 className="font-medium mb-2">{step.title}</h3>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Referral Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rewards.map((reward, index) => (
              <Card key={index} className="bg-background/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <reward.icon className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-center">{reward.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription>{reward.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-8">
          <div className="text-center mb-8">
            <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ready to Refer?</h2>
            <p className="text-muted-foreground">
              Send your referrals to <span className="text-primary">referrals@zeroleaks.ai</span> or use the button
              below to start the process.
            </p>
          </div>
          <div className="flex justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/contact?ref=referral">Start Referring Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

