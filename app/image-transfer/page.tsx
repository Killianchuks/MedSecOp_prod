"use client"

import { useState } from "react"
// Use relative imports instead of alias imports
import { ImageRequestForm } from "../../components/image-request-form"
import { ImageRequestList } from "../../components/image-request-list"
import { ImageTransferWorkflow } from "../../components/image-transfer-workflow"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ImageTransferPage() {
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState("requests")

  const handleNewRequest = () => {
    setShowForm(true)
  }

  const handleFormComplete = () => {
    setShowForm(false)
    // Optionally refresh the list data here
  }

  return (
    <div className="container max-w-5xl py-8 space-y-8">
      <h1 className="text-3xl font-bold">Medical Image Transfer</h1>

      {/* Show workflow diagram at the top */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <ImageTransferWorkflow />
      </section>

      {showForm ? (
        <section>
          <div className="flex items-center mb-4">
            <Button variant="ghost" size="sm" className="gap-1" onClick={() => setShowForm(false)}>
              <ArrowLeft className="h-4 w-4" /> Back to Requests
            </Button>
            <h2 className="text-xl font-semibold ml-2">New Image Transfer Request</h2>
          </div>
          <ImageRequestForm onComplete={handleFormComplete} />
        </section>
      ) : (
        <section>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="requests">My Requests</TabsTrigger>
              <TabsTrigger value="shared">Shared With Me</TabsTrigger>
            </TabsList>
            <TabsContent value="requests" className="mt-4">
              <ImageRequestList onNewRequest={handleNewRequest} />
            </TabsContent>
            <TabsContent value="shared" className="mt-4">
              <div className="bg-muted p-8 rounded-lg text-center">
                <p className="text-muted-foreground">No images have been shared with you yet.</p>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      )}
    </div>
  )
}

