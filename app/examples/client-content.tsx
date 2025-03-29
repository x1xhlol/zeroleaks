"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Shield, Github, Star, GitFork, Eye, AlertCircle, RefreshCw } from "lucide-react"

type FormattedRepoData = {
  stargazers_count: string
  forks_count: string
  watchers_count: string
  updated_at_relative: string
  updated_at: string
  folders: string[]
  description: string
  error?: string
  html_url: string
  full_name: string
}

export function ClientExamplesContent({ repoData }: { repoData: FormattedRepoData }) {
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
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              System Prompts Repository
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">AI System Prompts Collection</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              All examples and system prompts are now available in this comprehensive GitHub repository.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-background/50 backdrop-blur-sm border-border/50 mb-12">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Github className="h-6 w-6 mr-3" />
                {repoData.full_name}
              </CardTitle>
              <CardDescription className="text-base">
                A comprehensive collection of system prompts and models from various AI tools
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <div>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    <Star className="h-4 w-4 mr-1" /> {repoData.stargazers_count} stars
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    <GitFork className="h-4 w-4 mr-1" /> {repoData.forks_count} forks
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    <Eye className="h-4 w-4 mr-1" /> {repoData.watchers_count} watching
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    <RefreshCw className="h-4 w-4 mr-1" /> Updated {repoData.updated_at_relative}
                  </span>
                </div>

                <div className="bg-muted p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-bold mb-4">
                    FULL v0, Cursor, Manus, Same.dev & Lovable System Prompts & AI Models
                  </h3>
                  <p className="mb-4">
                    🔍 I managed to obtain FULL official v0, Manus, Cursor, Same.dev & Lovable system prompts and
                    internal tools.
                  </p>
                  <p className="mb-4">📝 Over 5,500+ lines of insights into their structure and functionality.</p>

                  <h4 className="text-lg font-semibold mt-6 mb-3">📂 Available Files</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    {repoData.folders.map((folder, index) => (
                      <li key={index}>{folder} Folder</li>
                    ))}
                  </ul>
                </div>

                {repoData.error && (
                  <div className="bg-destructive/10 p-4 rounded-lg mb-6 border border-destructive/20">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-destructive mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium text-destructive">Error fetching latest data</p>
                        <p className="text-sm text-muted-foreground">Using cached data. Error: {repoData.error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <img
                    src="https://sjc.microlink.io/QlnkADvsNmvRxYg_4miaHHww2jC0EN9El_8FCAJR3AvTtaXjkp-kmj_6fGWIaE-efQiBvVYF3FsBjRe7LffLRQ.jpeg"
                    alt="Screenshot of the GitHub repository showing system prompts collection"
                    className="w-full h-auto rounded-lg border border-border"
                  />
                </div>

                <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-primary" />
                    How ZeroLeaks Can Help Protect Your AI
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    As demonstrated by this repository, AI system prompts can be extracted and shared publicly.
                    ZeroLeaks specializes in identifying vulnerabilities in your AI systems that could lead to similar
                    exposures of your intellectual property.
                  </p>
                  <p className="text-muted-foreground">
                    Our security assessments can help you implement robust protections against prompt engineering
                    attacks and system instruction extraction.
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <a href={repoData.html_url} target="_blank" rel="noopener noreferrer">
                  Visit GitHub Repository
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>

          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Protect Your AI System Prompts</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Don't let your AI's system instructions become the next entry in this repository. Contact ZeroLeaks for a
              comprehensive security assessment.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={() => (window.location.href = "/contact")}
            >
              Request an Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

