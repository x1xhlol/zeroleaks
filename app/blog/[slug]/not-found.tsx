import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist or has been moved.</p>
        <Button asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>
    </div>
  )
}

