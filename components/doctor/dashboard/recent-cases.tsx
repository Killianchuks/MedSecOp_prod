import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const recentCases = [
  {
    id: "CASE-1234",
    patientName: "Sarah Johnson",
    patientInitials: "SJ",
    specialty: "Cardiology",
    condition: "Atrial Fibrillation",
    status: "In Progress",
    date: "Mar 15, 2025",
    dueDate: "Mar 18, 2025",
  },
  {
    id: "CASE-1233",
    patientName: "Michael Brown",
    patientInitials: "MB",
    specialty: "Oncology",
    condition: "Breast Cancer",
    status: "Completed",
    date: "Mar 12, 2025",
    dueDate: "Mar 15, 2025",
  },
  {
    id: "CASE-1232",
    patientName: "David Wilson",
    patientInitials: "DW",
    specialty: "Neurology",
    condition: "Migraine",
    status: "In Progress",
    date: "Mar 10, 2025",
    dueDate: "Mar 13, 2025",
  },
  {
    id: "CASE-1231",
    patientName: "Emily Davis",
    patientInitials: "ED",
    specialty: "Orthopedics",
    condition: "Rotator Cuff Tear",
    status: "Completed",
    date: "Mar 8, 2025",
    dueDate: "Mar 11, 2025",
  },
  {
    id: "CASE-1230",
    patientName: "Robert Miller",
    patientInitials: "RM",
    specialty: "Gastroenterology",
    condition: "Crohn's Disease",
    status: "Completed",
    date: "Mar 5, 2025",
    dueDate: "Mar 8, 2025",
  },
]

export function RecentCases() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Cases</CardTitle>
        <CardDescription>Your most recent case reviews</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentCases.map((caseItem) => (
            <div key={caseItem.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>{caseItem.patientInitials}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{caseItem.patientName}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{caseItem.id}</span>
                    <span>•</span>
                    <span>{caseItem.specialty}</span>
                  </div>
                  <p className="text-sm">{caseItem.condition}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant={caseItem.status === "Completed" ? "outline" : "default"}>{caseItem.status}</Badge>
                <div className="text-xs text-muted-foreground">Due: {caseItem.dueDate}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

