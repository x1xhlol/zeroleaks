import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, FileText, Mail, Settings, ChevronLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "ZeroLeaks Admin",
  description: "Admin dashboard for ZeroLeaks website",
}

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-background/50 backdrop-blur-sm border-r border-border/50 p-4">
        <div className="mb-8">
          <Button asChild variant="outline" size="sm" className="mb-6">
            <Link href="/">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Website
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>

        <nav className="space-y-2">
          <Link href="/admin" className="flex items-center p-2 rounded-md hover:bg-muted transition-colors">
            <LayoutDashboard className="mr-2 h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/admin/subscribers" className="flex items-center p-2 rounded-md hover:bg-muted transition-colors">
            <Users className="mr-2 h-5 w-5" />
            Subscribers
          </Link>
          <Link href="/admin/blog" className="flex items-center p-2 rounded-md hover:bg-muted transition-colors">
            <FileText className="mr-2 h-5 w-5" />
            Blog Posts
          </Link>
          <Link href="/admin/contacts" className="flex items-center p-2 rounded-md hover:bg-muted transition-colors">
            <Mail className="mr-2 h-5 w-5" />
            Contact Submissions
          </Link>
          <Link href="/admin/settings" className="flex items-center p-2 rounded-md hover:bg-muted transition-colors">
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}

