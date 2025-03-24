"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, Calendar, Filter, Plus, Eye, Edit, Trash, Send, Users, UserCog } from "lucide-react"

// Sample notifications
const notifications = [
  {
    id: "NOTIF-1001",
    title: "New Feature: Video Consultations",
    message: "We've added video consultations for follow-up appointments. Try it now!",
    audience: "All Users",
    scheduledDate: "Mar 20, 2025",
    status: "Scheduled",
  },
  {
    id: "NOTIF-1002",
    title: "System Maintenance",
    message: "The platform will be down for maintenance on March 25 from 2-4 AM EST.",
    audience: "All Users",
    scheduledDate: "Mar 23, 2025",
    status: "Scheduled",
  },
  {
    id: "NOTIF-1003",
    title: "New Specialty Added: Rheumatology",
    message: "We've added Rheumatology to our available specialties. Refer patients now!",
    audience: "Doctors",
    scheduledDate: "Mar 15, 2025",
    status: "Sent",
  },
  {
    id: "NOTIF-1004",
    title: "Billing Update",
    message: "We've updated our billing system. Please update your payment methods.",
    audience: "Patients",
    scheduledDate: "Mar 10, 2025",
    status: "Sent",
  },
  {
    id: "NOTIF-1005",
    title: "Holiday Schedule",
    message: "Our support team will have limited availability during the upcoming holidays.",
    audience: "All Users",
    scheduledDate: "Mar 5, 2025",
    status: "Sent",
  },
  {
    id: "NOTIF-1006",
    title: "Welcome to Our New Doctors",
    message: "Please join us in welcoming 15 new specialists to our platform!",
    audience: "All Users",
    scheduledDate: null,
    status: "Draft",
  },
]

export function NotificationManager() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.audience.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Notification Management</CardTitle>
              <CardDescription>Create and manage system notifications</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Notification
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
            </TabsList>

            <div className="flex justify-between items-center mb-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Notification</TableHead>
                    <TableHead>Audience</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{notification.title}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">{notification.message}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {notification.audience === "All Users" ? (
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>All Users</span>
                            </div>
                          ) : notification.audience === "Doctors" ? (
                            <div className="flex items-center gap-1">
                              <UserCog className="h-3 w-3" />
                              <span>Doctors</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>Patients</span>
                            </div>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {notification.scheduledDate ? (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{notification.scheduledDate}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Not scheduled</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            notification.status === "Sent"
                              ? "outline"
                              : notification.status === "Scheduled"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {notification.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </DropdownMenuItem>
                            {notification.status !== "Sent" && (
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                            )}
                            {notification.status === "Draft" && (
                              <DropdownMenuItem>
                                <Calendar className="h-4 w-4 mr-2" />
                                Schedule
                              </DropdownMenuItem>
                            )}
                            {(notification.status === "Draft" || notification.status === "Scheduled") && (
                              <DropdownMenuItem>
                                <Send className="h-4 w-4 mr-2" />
                                Send Now
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

