import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Clock, FileText, ChevronRight } from "lucide-react"
import Link from "next/link"

const recentCases = [
  {
    id: "CASE-1234",
    title: "Atrial Fibrillation Consultation",
    specialty: "Cardiology",
    status: "In Progress",
    date: "Mar 15, 2025",
    dueDate: "Mar 18, 2025",
    doctor: {
      name: "Dr. Jane Smith",
      initials: "JS",
      specialty: "Cardiologist",
    },
  },
  {
    id: "CASE-1233",
    title: "Chronic Migraine Treatment Review",
    specialty: "Neurology",
    status: "Unassigned",
    date: "Mar 14, 2025",
    dueDate: "Pending Assignment",
    doctor: null,
  },
  {
    id: "CASE-1232",
    title: "Lower Back Pain Evaluation",
    specialty: "Orthopedics",
    status: "In Progress",
    date: "Mar 12, 2025",
    dueDate: "Mar 16, 2025",
    doctor: {
      name: "Dr. Michael Chen",
      initials: "MC",
      specialty: "Orthopedic Surgeon",
    },
  },
  {
    id: "CASE-1231",
    title: "Skin Lesion Assessment",
    specialty: "Dermatology",
    status: "Completed",
    date: "Mar 10, 2025",
    completedDate: "Mar 13, 2025",
    doctor: {
      name: "Dr. Emily Davis",
      initials: "ED",
      specialty: "Dermatologist",
    },
  },
]

export function RecentCases() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Cases</CardTitle>
          <CardDescription>Your most recent second opinion requests</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/patient/cases">
            View All Cases
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentCases.map((caseItem) => (
            <div key={caseItem.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="hidden sm:block">
                  <FileText className="h-8 w-8 text-primary/70" />
                </div>
                <div>
                  <h4 className="font-medium">{caseItem.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{caseItem.id}</span>
                    <span>•</span>
                    <span>{caseItem.specialty}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Submitted: {caseItem.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge
                  variant={
                    caseItem.status === "Completed"
                      ? "outline"
                      : caseItem.status === "In Progress"
                        ? "default"
                        : "secondary"
                  }
                >
                  {caseItem.status}
                </Badge>
                {caseItem.doctor ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{caseItem.doctor.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{caseItem.doctor.name}</span>
                  </div>
                ) : (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Awaiting assignment</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

