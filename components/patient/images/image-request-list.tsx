"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, AlertCircle, CheckCircle, ImageIcon, Hospital } from "lucide-react"

// Sample image request data
const imageRequests = [
  {
    id: "IMG-1234",
    facilityName: "Memorial Hospital",
    imageType: "MRI",
    bodyPart: "Brain",
    requestDate: "Mar 15, 2025",
    status: "Completed",
    completedDate: "Mar 18, 2025",
  },
  {
    id: "IMG-1235",
    facilityName: "City Medical Center",
    imageType: "X-Ray",
    bodyPart: "Chest",
    requestDate: "Mar 14, 2025",
    status: "Processing",
    estimatedDate: "Mar 20, 2025",
  },
  {
    id: "IMG-1236",
    facilityName: "University Health",
    imageType: "CT Scan",
    bodyPart: "Abdomen",
    requestDate: "Mar 12, 2025",
    status: "Pending",
  },
]

export function ImageRequestList() {
  const [selectedTab, setSelectedTab] = useState("all")

  const getRequestsByTab = (tab: string) => {
    return imageRequests.filter((req) => {
      if (tab === "pending") return req.status === "Pending"
      if (tab === "processing") return req.status === "Processing"
      if (tab === "completed") return req.status === "Completed"
      return true
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Transfer Requests</CardTitle>
        <CardDescription>Track the status of your medical image transfer requests</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-4 mx-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value={selectedTab} className="p-0">
            <div className="divide-y">
              {getRequestsByTab(selectedTab).length > 0 ? (
                getRequestsByTab(selectedTab).map((request) => (
                  <div key={request.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">
                          {request.imageType} - {request.bodyPart}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{request.id}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <Hospital className="h-3 w-3 mr-1" />
                            <span>{request.facilityName}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge
                          variant={
                            request.status === "Completed"
                              ? "outline"
                              : request.status === "Processing"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {request.status}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>
                            {request.status === "Completed"
                              ? `Completed: ${request.completedDate}`
                              : request.status === "Processing"
                                ? `Est. completion: ${request.estimatedDate}`
                                : `Requested: ${request.requestDate}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    {request.status === "Completed" && (
                      <div className="mt-3">
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          <ImageIcon className="h-4 w-4 mr-2" />
                          View Images
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  <div className="mb-2">
                    {selectedTab === "pending" ? (
                      <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground/60" />
                    ) : selectedTab === "processing" ? (
                      <Clock className="h-8 w-8 mx-auto text-muted-foreground/60" />
                    ) : selectedTab === "completed" ? (
                      <CheckCircle className="h-8 w-8 mx-auto text-muted-foreground/60" />
                    ) : (
                      <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground/60" />
                    )}
                  </div>
                  <p>No {selectedTab} image requests at the moment.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

