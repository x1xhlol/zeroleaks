"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Calculator, DollarSign, TrendingUp } from "lucide-react"
import Link from "next/link"

export function ROICalculator() {
  const [companySize, setCompanySize] = useState(50)
  const [aiImportance, setAiImportance] = useState(50)
  const [competitiveAdvantage, setCompetitiveAdvantage] = useState(50)
  const [annualRevenue, setAnnualRevenue] = useState(1000000)

  // Calculate potential loss
  const calculatePotentialLoss = () => {
    // This is a simplified model - in reality, you'd want a more sophisticated calculation
    const sizeFactor = companySize / 100
    const importanceFactor = aiImportance / 100
    const advantageFactor = competitiveAdvantage / 100

    // Base potential loss as a percentage of annual revenue
    const baseLossPercentage = 0.05 // 5%

    // Adjusted loss percentage based on factors
    const adjustedLossPercentage = ((baseLossPercentage * (sizeFactor + importanceFactor + advantageFactor)) / 3) * 2

    // Calculate potential loss
    const potentialLoss = annualRevenue * adjustedLossPercentage

    return Math.round(potentialLoss)
  }

  const potentialLoss = calculatePotentialLoss()
  const basicPackageCost = 299
  const enterprisePackageCost = 599

  // Calculate ROI (simplified)
  const calculateROI = (cost: number) => {
    const roi = ((potentialLoss - cost) / cost) * 100
    return Math.round(roi)
  }

  const basicROI = calculateROI(basicPackageCost)
  const enterpriseROI = calculateROI(enterprisePackageCost)

  return (
    <Card className="w-full max-w-2xl mx-auto bg-background/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5 text-primary" />
          AI Security ROI Calculator
        </CardTitle>
        <CardDescription>
          Estimate the potential cost of an AI system instruction leak and calculate your return on investment from our
          security services.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="annual-revenue" className="mb-2 block">
              Annual Revenue
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="annual-revenue"
                type="number"
                value={annualRevenue}
                onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                className="pl-9"
                min={0}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="company-size">Company Size</Label>
              <span className="text-sm text-muted-foreground">
                {companySize < 33 ? "Small" : companySize < 66 ? "Medium" : "Large"}
              </span>
            </div>
            <Slider
              id="company-size"
              value={[companySize]}
              onValueChange={(value) => setCompanySize(value[0])}
              max={100}
              step={1}
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="ai-importance">AI Importance to Business</Label>
              <span className="text-sm text-muted-foreground">
                {aiImportance < 33 ? "Low" : aiImportance < 66 ? "Medium" : "High"}
              </span>
            </div>
            <Slider
              id="ai-importance"
              value={[aiImportance]}
              onValueChange={(value) => setAiImportance(value[0])}
              max={100}
              step={1}
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="competitive-advantage">AI Competitive Advantage</Label>
              <span className="text-sm text-muted-foreground">
                {competitiveAdvantage < 33 ? "Low" : competitiveAdvantage < 66 ? "Medium" : "High"}
              </span>
            </div>
            <Slider
              id="competitive-advantage"
              value={[competitiveAdvantage]}
              onValueChange={(value) => setCompetitiveAdvantage(value[0])}
              max={100}
              step={1}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h3 className="text-lg font-medium mb-4">Potential Impact of AI System Instruction Leak</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-background/70 p-4 rounded-lg border border-border">
              <div className="text-sm text-muted-foreground mb-1">Estimated Potential Loss</div>
              <div className="text-2xl font-bold text-destructive">${potentialLoss.toLocaleString()}</div>
            </div>

            <div className="bg-background/70 p-4 rounded-lg border border-border">
              <div className="text-sm text-muted-foreground mb-1">Risk Level</div>
              <div className="text-2xl font-bold">
                {potentialLoss < 10000 ? (
                  <span className="text-green-500">Low</span>
                ) : potentialLoss < 50000 ? (
                  <span className="text-yellow-500">Medium</span>
                ) : (
                  <span className="text-red-500">High</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            Return on Investment
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-background/70 p-4 rounded-lg border border-border">
              <div className="text-sm text-muted-foreground mb-1">Startup Package ($299)</div>
              <div className="text-2xl font-bold text-primary">{basicROI.toLocaleString()}% ROI</div>
              <div className="text-xs text-muted-foreground mt-1">Based on potential loss prevention</div>
            </div>

            <div className="bg-background/70 p-4 rounded-lg border border-border">
              <div className="text-sm text-muted-foreground mb-1">Enterprise Package ($599)</div>
              <div className="text-2xl font-bold text-primary">{enterpriseROI.toLocaleString()}% ROI</div>
              <div className="text-xs text-muted-foreground mt-1">Based on potential loss prevention</div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          <Link href="/contact">Get Protected Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

