"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bug, AlertCircle, CheckCircle, Clock, X } from "lucide-react"
import { IssueStatus, IssuePriority, IssueType } from "@/lib/issue-tracker"

export default function IssueTrackerPage() {
  const [issues, setIssues] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    type: "",
    component: "",
  })
  const [newIssue, setNewIssue] = useState({
    title: "",
    description: "",
    type: IssueType.BUG,
    priority: IssuePriority.MEDIUM,
    component: "",
    affectedPages: [],
    stepsToReproduce: [],
    expectedBehavior: "",
    actualBehavior: "",
    browserInfo: "",
    deviceInfo: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalIssues, setTotalIssues] = useState(0)
  const issuesPerPage = 10

  // Fetch issues
  const fetchIssues = async () => {
    setLoading(true)
    setError(null)

    try {
      // Build query params
      const queryParams = new URLSearchParams()
      if (filters.status) queryParams.append("status", filters.status)
      if (filters.priority) queryParams.append("priority", filters.priority)
      if (filters.type) queryParams.append("type", filters.type)
      if (filters.component) queryParams.append("component", filters.component)

      queryParams.append("limit", issuesPerPage.toString())
      queryParams.append("offset", ((currentPage - 1) * issuesPerPage).toString())

      const response = await fetch(`/api/issues?${queryParams.toString()}`)
      if (!response.ok) {
        throw new Error("Failed to fetch issues")
      }

      const data = await response.json()
      setIssues(data.issues)
      setTotalIssues(data.pagination.total)
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching issues")
    } finally {
      setLoading(false)
    }
  }

  // Create a new issue
  const createNewIssue = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIssue),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create issue")
      }

      // Reset form and close dialog
      setNewIssue({
        title: "",
        description: "",
        type: IssueType.BUG,
        priority: IssuePriority.MEDIUM,
        component: "",
        affectedPages: [],
        stepsToReproduce: [],
        expectedBehavior: "",
        actualBehavior: "",
        browserInfo: "",
        deviceInfo: "",
      })
      setIsDialogOpen(false)

      // Refresh issues
      fetchIssues()
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the issue")
    } finally {
      setLoading(false)
    }
  }

  // Load issues on initial render and when filters or pagination change
  useEffect(() => {
    //fetchIssues()
  }, [filters, currentPage])

  // Helper function to render status badge
  const renderStatusBadge = (status: IssueStatus) => {
    switch (status) {
      case IssueStatus.OPEN:
        return (
          <Badge className="bg-red-500">
            <AlertCircle className="w-4 h-4 mr-1" /> Open
          </Badge>
        )
      case IssueStatus.IN_PROGRESS:
        return (
          <Badge className="bg-blue-500">
            <Clock className="w-4 h-4 mr-1" /> In Progress
          </Badge>
        )
      case IssueStatus.RESOLVED:
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="w-4 h-4 mr-1" /> Resolved
          </Badge>
        )
      case IssueStatus.CLOSED:
        return (
          <Badge className="bg-gray-500">
            <X className="w-4 h-4 mr-1" /> Closed
          </Badge>
        )
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>
    }
  }

  // Helper function to render priority badge
  const renderPriorityBadge = (priority: IssuePriority) => {
    switch (priority) {
      case IssuePriority.CRITICAL:
        return <Badge className="bg-red-600">Critical</Badge>
      case IssuePriority.HIGH:
        return <Badge className="bg-orange-500">High</Badge>
      case IssuePriority.MEDIUM:
        return <Badge className="bg-yellow-500">Medium</Badge>
      case IssuePriority.LOW:
        return <Badge className="bg-green-500">Low</Badge>
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>
    }
  }

  // Helper function to render type badge
  const renderTypeBadge = (type: IssueType) => {
    switch (type) {
      case IssueType.BUG:
        return (
          <Badge className="bg-red-500">
            <Bug className="w-4 h-4 mr-1" /> Bug
          </Badge>
        )
      case IssueType.FEATURE:
        return <Badge className="bg-blue-500">Feature</Badge>
      case IssueType.IMPROVEMENT:
        return <Badge className="bg-green-500">Improvement</Badge>
      case IssueType.SECURITY:
        return <Badge className="bg-purple-500">Security</Badge>
      case IssueType.PERFORMANCE:
        return <Badge className="bg-yellow-500">Performance</Badge>
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Issue Tracker</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Open Issues</CardTitle>
            <CardDescription>Currently active issues in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <IssueItem
                id="ISSUE-123"
                title="Login page not responsive on mobile"
                priority="High"
                status="Open"
                assignee="John Doe"
              />
              <IssueItem
                id="ISSUE-124"
                title="Case submission form validation error"
                priority="Medium"
                status="In Progress"
                assignee="Jane Smith"
              />
              <IssueItem
                id="ISSUE-125"
                title="Payment gateway timeout"
                priority="Critical"
                status="Open"
                assignee="Unassigned"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resolved Issues</CardTitle>
            <CardDescription>Recently fixed issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <IssueItem
                id="ISSUE-120"
                title="Email notifications not sending"
                priority="High"
                status="Resolved"
                assignee="John Doe"
              />
              <IssueItem
                id="ISSUE-121"
                title="Dashboard statistics incorrect"
                priority="Medium"
                status="Resolved"
                assignee="Jane Smith"
              />
              <IssueItem
                id="ISSUE-122"
                title="User profile image upload failing"
                priority="Low"
                status="Resolved"
                assignee="Alex Johnson"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function IssueItem({
  id,
  title,
  priority,
  status,
  assignee,
}: {
  id: string
  title: string
  priority: string
  status: string
  assignee: string
}) {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "text-red-600 bg-red-100"
      case "high":
        return "text-orange-600 bg-orange-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "low":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "text-blue-600 bg-blue-100"
      case "in progress":
        return "text-purple-600 bg-purple-100"
      case "resolved":
        return "text-green-600 bg-green-100"
      case "closed":
        return "text-gray-600 bg-gray-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-gray-500">{id}</div>
          <div className="font-medium">{title}</div>
        </div>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(priority)}`}>{priority}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>{status}</span>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-600">Assignee: {assignee}</div>
    </div>
  )
}

