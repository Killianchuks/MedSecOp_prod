import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, FileText, CheckCircle, AlertCircle, DollarSign, Calendar } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "new_patient",
    title: "New Patient Registration",
    description: "Sarah Johnson created a new patient account",
    time: "10 minutes ago",
    icon: <UserPlus className="h-4 w-4 text-blue-500" />,
  },
  {
    id: 2,
    type: "case_submitted",
    title: "New Case Submitted",
    description: "Case #1241 submitted for Cardiology consultation",
    time: "25 minutes ago",
    icon: <FileText className="h-4 w-4 text-green-500" />,
  },
  {
    id: 3,
    type: "case_assigned",
    title: "Case Assigned",
    description: "Dr. Jane Smith assigned to Case #1238",
    time: "1 hour ago",
    icon: <CheckCircle className="h-4 w-4 text-purple-500" />,
  },
  {
    id: 4,
    type: "urgent_case",
    title: "Urgent Case Alert",
    description: "Case #1235 marked as urgent and requires immediate attention",
    time: "2 hours ago",
    icon: <AlertCircle className="h-4 w-4 text-red-500" />,
  },
  {
    id: 5,
    type: "payment",
    title: "Payment Received",
    description: "Payment of $350 received for Case #1232",
    time: "3 hours ago",
    icon: <DollarSign className="h-4 w-4 text-emerald-500" />,
  },
  {
    id: 6,
    type: "case_completed",
    title: "Case Completed",
    description: "Dr. Michael Chen completed review for Case #1230",
    time: "5 hours ago",
    icon: <CheckCircle className="h-4 w-4 text-blue-500" />,
  },
]

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Latest activities across the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="mt-1 rounded-full p-2 bg-gray-100">{activity.icon}</div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {activity.time}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

