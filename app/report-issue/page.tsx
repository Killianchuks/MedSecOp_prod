"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { IssueType, IssuePriority } from "@/lib/issue-tracker"
import { CheckCircle } from "lucide-react"

export default function ReportIssuePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: IssueType.BUG,
    priority: IssuePriority.MEDIUM,
    component: "",
    affectedPages: "",
    stepsToReproduce: "",
    expectedBehavior: "",
    actualBehavior: "",
    browserInfo: "",
    deviceInfo: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Validate required fields
      if (!formData.title || !formData.description) {
        throw new Error("Title and description are required")
      }

      // Prepare data for API
      const issueData = {
        ...formData,
        affectedPages: formData.affectedPages ? formData.affectedPages.split(",").map((p) => p.trim()) : [],
        stepsToReproduce: formData.stepsToReproduce
          ? formData.stepsToReproduce.split("\n").filter((s) => s.trim())
          : [],
      }

      // Submit to API
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issueData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit issue")
      }

      // Show success and reset form
      setSuccess(true)
      setFormData({
        title: "",
        description: "",
        type: IssueType.BUG,
        priority: IssuePriority.MEDIUM,
        component: "",
        affectedPages: "",
        stepsToReproduce: "",
        expectedBehavior: "",
        actualBehavior: "",
        browserInfo: "",
        deviceInfo: "",
      })

      // Auto-detect browser and device info
      const browserInfo = detectBrowserInfo()
      const deviceInfo = detectDeviceInfo()

      setFormData((prev) => ({
        ...prev,
        browserInfo,
        deviceInfo,
      }))
    } catch (err: any) {
      setError(err.message || "An error occurred while submitting the issue")
    } finally {
      setLoading(false)
    }
  }

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Auto-detect browser info
  const detectBrowserInfo = () => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent
      let browserName = "Unknown"
      let browserVersion = ""

      if (userAgent.indexOf("Firefox") > -1) {
        browserName = "Firefox"
        browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || ""
      } else if (userAgent.indexOf("Chrome") > -1) {
        browserName = "Chrome"
        browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || ""
      } else if (userAgent.indexOf("Safari") > -1) {
        browserName = "Safari"
        browserVersion = userAgent.match(/Version\/([0-9.]+)/)?.[1] || ""
      } else if (userAgent.indexOf("Edge") > -1) {
        browserName = "Edge"
        browserVersion = userAgent.match(/Edge\/([0-9.]+)/)?.[1] || ""
      } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident/") > -1) {
        browserName = "Internet Explorer"
        browserVersion = userAgent.match(/(?:MSIE |rv:)([0-9.]+)/)?.[1] || ""
      }

      return `${browserName} ${browserVersion}`
    }
    return ""
  }

  // Auto-detect device info
  const detectDeviceInfo = () => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent
      let os = "Unknown"
      let osVersion = ""
      let deviceType = "Desktop"

      // Detect OS
      if (userAgent.indexOf("Win") > -1) {
        os = "Windows"
        osVersion = userAgent.match(/Windows NT ([0-9.]+)/)?.[1] || ""
      } else if (userAgent.indexOf("Mac") > -1) {
        os = "MacOS"
        osVersion = userAgent.match(/Mac OS X ([0-9_]+)/)?.[1]?.replace(/_/g, ".") || ""
      } else if (userAgent.indexOf("Linux") > -1) {
        os = "Linux"
      } else if (userAgent.indexOf("Android") > -1) {
        os = "Android"
        osVersion = userAgent.match(/Android ([0-9.]+)/)?.[1] || ""
        deviceType = "Mobile"
      } else if (userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1) {
        os = "iOS"
        osVersion = userAgent.match(/OS ([0-9_]+)/)?.[1]?.replace(/_/g, ".") || ""
        deviceType = userAgent.indexOf("iPad") > -1 ? "Tablet" : "Mobile"
      }

      return `${deviceType}, ${os} ${osVersion}`
    }
    return ""
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Report an Issue</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your issue has been reported successfully. Thank you for helping us improve MedSecOp!
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Issue Details</CardTitle>
          <CardDescription>
            Please provide as much detail as possible to help us understand and resolve the issue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="issue-type">Issue Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger id="issue-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={IssueType.BUG}>Bug</SelectItem>
                    <SelectItem value={IssueType.FEATURE}>Feature Request</SelectItem>
                    <SelectItem value={IssueType.IMPROVEMENT}>Improvement</SelectItem>
                    <SelectItem value={IssueType.SECURITY}>Security Issue</SelectItem>
                    <SelectItem value={IssueType.PERFORMANCE}>Performance Issue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={IssuePriority.LOW}>Low</SelectItem>
                    <SelectItem value={IssuePriority.MEDIUM}>Medium</SelectItem>
                    <SelectItem value={IssuePriority.HIGH}>High</SelectItem>
                    <SelectItem value={IssuePriority.CRITICAL}>Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Brief summary of the issue"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="component">Component</Label>
              <Input
                id="component"
                name="component"
                value={formData.component}
                onChange={handleChange}
                placeholder="Which component is affected? (e.g., Login, Dashboard, Payment)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="affectedPages">Affected Pages</Label>
              <Input
                id="affectedPages"
                name="affectedPages"
                value={formData.affectedPages}
                onChange={handleChange}
                placeholder="Comma-separated list of affected pages (e.g., /dashboard, /cases/new)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed description of the issue"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="expectedBehavior">Expected Behavior</Label>
                <Textarea
                  id="expectedBehavior"
                  name="expectedBehavior"
                  value={formData.expectedBehavior}
                  onChange={handleChange}
                  placeholder="What should happen?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="actualBehavior">Actual Behavior</Label>
                <Textarea
                  id="actualBehavior"
                  name="actualBehavior"
                  value={formData.actualBehavior}
                  onChange={handleChange}
                  placeholder="What actually happens?"
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stepsToReproduce">Steps to Reproduce</Label>
              <Textarea
                id="stepsToReproduce"
                name="stepsToReproduce"
                value={formData.stepsToReproduce}
                onChange={handleChange}
                placeholder="List the steps to reproduce the issue (one step per line)"
                rows={3}
              />
              <p className="text-xs text-gray-500">Enter each step on a new line</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="browserInfo">Browser Info</Label>
                <Input
                  id="browserInfo"
                  name="browserInfo"
                  value={formData.browserInfo}
                  onChange={handleChange}
                  placeholder="Browser name and version"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deviceInfo">Device Info</Label>
                <Input
                  id="deviceInfo"
                  name="deviceInfo"
                  value={formData.deviceInfo}
                  onChange={handleChange}
                  placeholder="Device type, OS, etc."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => window.history.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Issue"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

