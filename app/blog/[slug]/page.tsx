import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Calendar,
  User,
  Twitter,
  Linkedin,
  Facebook,
  Clock,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { notFound } from "next/navigation"
import { blogPosts } from "../blog-data"
import { SystemPromptSVG, VulnerabilitiesSVG, EthicsSVG, ProtectionSVG } from "@/components/blog-illustrations"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Find the current post index and determine previous/next posts
  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug)
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null

  // Determine which illustration to use based on the slug
  const getIllustration = () => {
    if (post.slug === "how-we-extracted-v0-system-prompt") {
      return <SystemPromptSVG />
    } else if (post.slug === "common-vulnerabilities-ai-system-instructions") {
      return <VulnerabilitiesSVG />
    } else if (post.slug === "ethics-of-prompt-engineering-attacks") {
      return <EthicsSVG />
    } else if (post.slug === "protecting-ai-from-prompt-injection") {
      return <ProtectionSVG />
    }
    return null
  }

  // Estimate reading time (rough calculation)
  const calculateReadingTime = () => {
    // Convert JSX content to string and count words
    const contentString = JSON.stringify(post.content)
    const wordCount = contentString.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200) // Assuming 200 words per minute
    return readingTime
  }

  return (
    <div className="min-h-screen pt-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 bg-primary"></div>
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 bg-secondary"></div>

      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <div className="max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {post.date}
              </span>
              <span className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.author}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {calculateReadingTime()} min read
              </span>
              <span className="flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                AI Security
              </span>
            </div>

            <div className="mb-8 rounded-lg overflow-hidden border border-border">
              {getIllustration() || (
                <img
                  src={post.featuredImage || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                />
              )}
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-background/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-8">
              <article className="prose prose-invert prose-headings:gradient-text prose-headings:font-bold prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:bg-muted prose-code:p-1 prose-code:rounded prose-code:text-primary max-w-none">
                {post.content}
              </article>

              <Separator className="my-8" />

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">Share this article:</p>
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="icon" asChild>
                      <Link
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://zeroleaks.ai/blog/${post.slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Twitter"
                      >
                        <Twitter className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://zeroleaks.ai/blog/${post.slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on LinkedIn"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://zeroleaks.ai/blog/${post.slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Facebook"
                      >
                        <Facebook className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <Button asChild>
                  <Link href="/contact">Test Your AI Security</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Previous/Next Post Navigation */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {prevPost && (
              <Link href={`/blog/${prevPost.slug}`} className="group">
                <Card className="bg-background/50 backdrop-blur-sm border-border/50 h-full hover:border-primary/50 transition-all">
                  <CardContent className="p-4 flex items-center">
                    <ChevronLeft className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Previous Article</p>
                      <p className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                        {prevPost.title}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )}

            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`} className="group md:ml-auto">
                <Card className="bg-background/50 backdrop-blur-sm border-border/50 h-full hover:border-primary/50 transition-all">
                  <CardContent className="p-4 flex items-center justify-end">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Next Article</p>
                      <p className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                        {nextPost.title}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 ml-2 text-primary" />
                  </CardContent>
                </Card>
              </Link>
            )}
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4">Want to learn more about AI security?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link href="/blog">Read More Articles</Link>
              </Button>
              <Button asChild>
                <Link href="/vulnerability-quiz">Take the Vulnerability Quiz</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

