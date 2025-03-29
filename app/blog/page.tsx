import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, ArrowRight, Clock, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { blogPosts } from "./blog-data"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BlogPage() {
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
              ZeroLeaks <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Insights, tutorials, and case studies on AI system instruction security and prompt engineering.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search articles..." className="pl-9" />
            </div>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden flex flex-col"
            >
              <div className="h-48 overflow-hidden border-b border-border/50">
                <img
                  src={post.featuredImage || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="flex items-center gap-4 text-xs">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date}
                  </span>
                  <span className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {post.author}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {Math.ceil(JSON.stringify(post.content).split(/\s+/).length / 200)} min
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{post.description}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/blog/${post.slug}`}>
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-6">Want to stay updated on AI security?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/contact">Subscribe to Our Newsletter</Link>
            </Button>
            <Button asChild>
              <Link href="/vulnerability-quiz">Take the Vulnerability Quiz</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

