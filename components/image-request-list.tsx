"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { PlusCircle, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Define the props interface for the component
export interface ImageRequestListProps {
  onNewRequest?: () => void
}

// Define the type for a request item
interface ImageRequest {
  id: string
  facilityName: string
  examType: string
  requestDate: Date
  status: "pending" | "approved" | "rejected" | "expired"
}

export function ImageRequestList({ onNewRequest }: ImageRequestListProps) {
  const [requests, setRequests] = useState<ImageRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch requests
    const fetchRequests = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockRequests: ImageRequest[] = [
          {
            id: "req-001",
            facilityName: "City General Hospital",
            examType: "MRI - Knee",
            requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            status: "pending",
          },
          {
            id: "req-002",
            facilityName: "Westside Imaging Center",
            examType: "X-Ray - Chest",
            requestDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
            status: "approved",
          },
          {
            id: "req-003",
            facilityName: "Medical Arts Clinic",
            examType: "CT Scan - Abdomen",
            requestDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
            status: "rejected",
          },
        ]

        setRequests(mockRequests)
      } catch (error) {
        console.error("Error fetching requests:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRequests()
  }, [])

  // Function to render status badge
  const renderStatusBadge = (status: ImageRequest["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="h-3 w-3" /> Rejected
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> Expired
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Transfer Requests</h3>
        <Button onClick={onNewRequest} size="sm" className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          New Request
        </Button>
      </div>

      {isLoading ? (
        // Loading state
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : requests.length > 0 ? (
        // Requests list
        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="font-medium">{request.facilityName}</h4>
                    <p className="text-sm text-muted-foreground">{request.examType}</p>
                    <p className="text-xs text-muted-foreground">
                      Requested {formatDistanceToNow(request.requestDate, { addSuffix: true })}
                    </p>
                  </div>
                  {renderStatusBadge(request.status)}
                </div>
              </CardContent>
              <CardFooter className="px-4 py-3 border-t bg-muted/50">
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        // Empty state
        <Card>
          <CardContent className="p-6 text-center">
            <div className="space-y-3">
              <p className="text-muted-foreground">You haven't made any image transfer requests yet.</p>
              <Button onClick={onNewRequest} className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                Create Your First Request
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

