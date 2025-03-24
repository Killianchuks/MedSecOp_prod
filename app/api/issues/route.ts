import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/auth"
import { createIssue, getIssues, type IssueStatus, type IssuePriority, type IssueType } from "@/lib/issue-tracker"

// Create a new issue
export const POST = withAuth(async (req: NextRequest, user) => {
  try {
    const body = await req.json()

    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    // Create the issue
    const { issue, error } = await createIssue(
      {
        title: body.title,
        description: body.description,
        type: body.type,
        priority: body.priority,
        component: body.component,
        affectedPages: body.affectedPages,
        stepsToReproduce: body.stepsToReproduce,
        expectedBehavior: body.expectedBehavior,
        actualBehavior: body.actualBehavior,
        browserInfo: body.browserInfo,
        deviceInfo: body.deviceInfo,
        screenshots: body.screenshots,
      },
      user,
    )

    if (error || !issue) {
      return NextResponse.json({ error: error || "Failed to create issue" }, { status: 400 })
    }

    return NextResponse.json({ message: "Issue created successfully", issue }, { status: 201 })
  } catch (error: any) {
    console.error("Issue creation error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
})

// Get issues
export const GET = withAuth(async (req: NextRequest, user) => {
  try {
    // Parse query parameters
    const url = new URL(req.url)
    const status = url.searchParams.get("status") as IssueStatus | undefined
    const priority = url.searchParams.get("priority") as IssuePriority | undefined
    const type = url.searchParams.get("type") as IssueType | undefined
    const component = url.searchParams.get("component") || undefined
    const reportedBy = url.searchParams.get("reportedBy") || undefined
    const assignedTo = url.searchParams.get("assignedTo") || undefined
    const limit = Number.parseInt(url.searchParams.get("limit") || "20")
    const offset = Number.parseInt(url.searchParams.get("offset") || "0")

    // Get issues
    const { issues, total, error } = await getIssues(
      {
        status,
        priority,
        type,
        component,
        reportedBy,
        assignedTo,
      },
      limit,
      offset,
    )

    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json(
      {
        issues,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + issues.length < total,
        },
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Issues retrieval error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
})

