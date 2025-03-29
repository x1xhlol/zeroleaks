"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, FileText, Eye, Clock } from "lucide-react"
import Link from "next/link"

export default function BlogAdminPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch blog posts data
    const fetchPosts = async () => {
      try {
        // This would be replaced with actual API call
        setLoading(false)
        // Mock data for now
        setPosts([])
      } catch (error) {
        console.error("Error fetching blog posts:", error)
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <Tabs defaultValue="published">
        <TabsList className="mb-4">
          <TabsTrigger value="published" className="flex items-center">
            <Eye className="mr-2 h-4 w-4" />
            Published
          </TabsTrigger>
          <TabsTrigger value="drafts" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Drafts
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Scheduled
          </TabsTrigger>
        </TabsList>

        <TabsContent value="published">
          {loading ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              </CardContent>
            </Card>
          ) : posts.length > 0 ? (
            <div className="grid gap-4">
              {/* Blog post cards would go here */}
              <Card>
                <CardContent className="p-6">
                  <p>Blog posts will appear here.</p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No published blog posts.</p>
                <Button className="mt-4" asChild>
                  <Link href="/admin/blog/new">Create Your First Post</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Other tab contents would be similar */}
        <TabsContent value="drafts">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No draft posts.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No scheduled posts.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

