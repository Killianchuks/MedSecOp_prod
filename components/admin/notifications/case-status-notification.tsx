"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  caseId: string
  status: "pending" | "accepted" | "rejected" | "completed"
  timestamp: string
  read: boolean
}

export function CaseStatusNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif-001",
      caseId: "CASE-002",
      status: "accepted",
      timestamp: new Date().toISOString(),
      read: false,
    },
    {
      id: "notif-002",
      caseId: "CASE-004",
      status: "rejected",
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      read: false,
    },
    {
      id: "notif-003",
      caseId: "CASE-003",
      status: "completed",
      timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      read: true,
    },
  ])

  // Function to mark notification as read
  const markAsRead = (notifId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notifId ? { ...n, read: true } : n)))
  }

  // Function to mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length

  // Function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "completed":
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  // Function to format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`
    } else if (diffMins < 1440) {
      const hours = Math.floor(diffMins / 60)
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`
    } else {
      const days = Math.floor(diffMins / 1440)
      return `${days} day${days !== 1 ? "s" : ""} ago`
    }
  }

  // Listen for new notifications (in a real app, this would be a WebSocket or polling)
  useEffect(() => {
    // This is a mock implementation
    const mockNewNotification = () => {
      const statuses = ["accepted", "rejected", "completed"] as const
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
      const newNotif: Notification = {
        id: `notif-${Date.now()}`,
        caseId: `CASE-00${Math.floor(Math.random() * 9) + 1}`,
        status: randomStatus,
        timestamp: new Date().toISOString(),
        read: false,
      }

      // In a real app, this would be triggered by a server event
      // For demo purposes, we're not actually adding this to avoid confusion
      console.log("New notification received:", newNotif)
    }

    // Simulate receiving a new notification every 30 seconds
    const interval = setInterval(mockNewNotification, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle className="text-xl">Case Status Notifications</CardTitle>
          <CardDescription>Stay updated on case status changes</CardDescription>
        </div>
        <div className="relative">
          <Bell className="h-6 w-6 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {unreadCount > 0 ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">{unreadCount} unread notifications</p>
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            </div>

            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-3 rounded-lg ${notification.read ? "bg-gray-50" : "bg-blue-50 border-l-4 border-blue-500"}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="mt-0.5">{getStatusIcon(notification.status)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm">
                        Case {notification.caseId} {notification.status}
                      </p>
                      <p className="text-xs text-muted-foreground">{formatTime(notification.timestamp)}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.status === "accepted" && "A physician has accepted this case for review."}
                      {notification.status === "rejected" && "A physician has rejected this case."}
                      {notification.status === "completed" && "A physician has completed their review of this case."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No unread notifications</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

