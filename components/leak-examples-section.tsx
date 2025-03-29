"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, Github, Star, GitFork, Eye, AlertCircle, RefreshCw } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Format numbers with commas
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Format date to relative time (e.g., "2 days ago")
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`

  const diffInYears = Math.floor(diffInMonths / 12)
  return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`
}

// Default repository data
const defaultRepoData = {
  stargazers_count: 6400,
  forks_count: 2800,
  watchers_count: 78,
  updated_at: new Date().toISOString(),
  error: null,
}

const LeakExamplesSection = () => {
  const [repoData, setRepoData] = useState(defaultRepoData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        // Use the API route we created
        const response = await fetch("/api/github-repo-data")
        if (!response.ok) {
          throw new Error(`Failed to fetch repository data: ${response.status}`)
        }
        const data = await response.json()
        setRepoData(data)
      } catch (error) {
        console.error("Error fetching repository data:", error)
        setRepoData({
          ...defaultRepoData,
          error: error instanceof Error ? error.message : "Unknown error",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchRepoData()
  }, [])

  return (
    <section className="py-20 bg-background/80 relative overflow-hidden" id="leak-examples">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            System Prompts Repository
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">AI System Prompts Collection</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover a comprehensive collection of system prompts from popular AI tools
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-background/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Github className="h-5 w-5 mr-2" />
                x1xhlol/system-prompts-and-models-of-ai-tools
              </CardTitle>
              <CardDescription>
                A comprehensive collection of system prompts and models from various AI tools
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {loading ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-8 w-28 rounded-full" />
                    ))}
                  </div>
                  <Skeleton className="h-32 w-full" />
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      <Star className="h-4 w-4 mr-1" /> {formatNumber(repoData.stargazers_count)} stars
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      <GitFork className="h-4 w-4 mr-1" /> {formatNumber(repoData.forks_count)} forks
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      <Eye className="h-4 w-4 mr-1" /> {formatNumber(repoData.watchers_count)} watching
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      <RefreshCw className="h-4 w-4 mr-1" /> Updated {formatRelativeTime(repoData.updated_at)}
                    </span>
                  </div>

                  <div className="bg-muted p-4 rounded-md">
                    <p className="mb-2">
                      🔍 FULL official v0, Manus, Cursor, Same.dev & Lovable system prompts and internal tools.
                    </p>
                    <p>📝 Over 5,500+ lines of insights into their structure and functionality.</p>
                  </div>

                  {repoData.error && (
                    <div className="bg-destructive/10 p-3 rounded-md text-sm">
                      <div className="flex items-start">
                        <AlertCircle className="h-4 w-4 text-destructive mr-2 mt-0.5" />
                        <p className="text-destructive">Using cached data. Error: {repoData.error}</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a
                  href="https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Repository
                  <Github className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                <Link href="/examples">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-12 text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Protect Your AI System Prompts</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Don't let your AI's system instructions become the next entry in this repository.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/contact">
                Test Your AI Security
                <Shield className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LeakExamplesSection

