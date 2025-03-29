"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Inbox, CheckCircle, Clock, Archive } from "lucide-react"

export default function ContactsPage() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch contacts data
    const fetchContacts = async () => {
      try {
        // This would be replaced with actual API call
        setLoading(false)
        // Mock data for now
        setContacts([])
      } catch (error) {
        console.error("Error fetching contacts:", error)
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Contact Submissions</h1>
      </div>

      <Tabs defaultValue="new">
        <TabsList className="mb-4">
          <TabsTrigger value="new" className="flex items-center">
            <Inbox className="mr-2 h-4 w-4" />
            New
          </TabsTrigger>
          <TabsTrigger value="read" className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4" />
            Read
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Pending
          </TabsTrigger>
          <TabsTrigger value="archived" className="flex items-center">
            <Archive className="mr-2 h-4 w-4" />
            Archived
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          {loading ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              </CardContent>
            </Card>
          ) : contacts.length > 0 ? (
            <div className="grid gap-4">
              {/* Contact cards would go here */}
              <Card>
                <CardContent className="p-6">
                  <p>Contact submissions will appear here.</p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No new contact submissions.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Other tab contents would be similar */}
        <TabsContent value="read">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No read contact submissions.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No pending contact submissions.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No archived contact submissions.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

