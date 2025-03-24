"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PatientSidebar } from "@/components/patient/dashboard/sidebar"
import { ImageGallery } from "@/components/patient/images/image-gallery"
import { ImageRequestList } from "@/components/patient/images/image-request-list"
import { ImageRequestForm } from "@/components/patient/images/image-request-form"
import { ImageTransferWorkflow } from "@/components/patient/images/image-transfer-workflow"
import { PlusCircle, ArrowLeft } from "lucide-react"

export default function PatientImagesPage() {
  const [activeTab, setActiveTab] = useState("my-images")
  const [showRequestForm, setShowRequestForm] = useState(false)

  const handleRequestClick = () => {
    setActiveTab("transfer-requests")
    setShowRequestForm(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PatientSidebar />

      <div className="lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Medical Images</h1>
                <p className="text-muted-foreground">View and manage your medical images and transfer requests</p>
              </div>
              <Button onClick={handleRequestClick} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Request Images
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full md:w-auto grid-cols-2">
                <TabsTrigger value="my-images">My Images</TabsTrigger>
                <TabsTrigger value="transfer-requests">Transfer Requests</TabsTrigger>
              </TabsList>

              <TabsContent value="my-images" className="mt-6">
                <ImageGallery />
              </TabsContent>

              <TabsContent value="transfer-requests" className="mt-6">
                {showRequestForm ? (
                  <div className="space-y-6">
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 mb-4 p-0"
                      onClick={() => setShowRequestForm(false)}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to requests
                    </Button>
                    <ImageRequestForm onComplete={() => setShowRequestForm(false)} />
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-2">How It Works</h3>
                      <ImageTransferWorkflow />
                    </div>
                    <ImageRequestList onNewRequest={() => setShowRequestForm(true)} />
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

