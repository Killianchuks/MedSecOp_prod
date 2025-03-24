import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, CheckCircle, Clock } from "lucide-react"

const timelineEvents = [
  {
    id: 1,
    date: "Mar 15, 2025",
    title: "Submitted Atrial Fibrillation Case",
    description: "Requested a second opinion for atrial fibrillation diagnosis",
    type: "submission",
    caseId: "CASE-1234",
  },
  {
    id: 2,
    date: "Mar 15, 2025",
    title: "Specialist Assigned",
    description: "Dr. Jane Smith (Cardiologist) assigned to your case",
    type: "assignment",
    caseId: "CASE-1234",
  },
  {
    id: 3,
    date: "Mar 14, 2025",
    title: "Submitted Chronic Migraine Case",
    description: "Requested a second opinion for chronic migraine treatment",
    type: "submission",
    caseId: "CASE-1233",
  },
  {
    id: 4,
    date: "Mar 13, 2025",
    title: "Opinion Received",
    description: "Dr. Emily Davis provided her assessment for your skin lesion",
    type: "completion",
    caseId: "CASE-1231",
  },
  {
    id: 5,
    date: "Mar 12, 2025",
    title: "Submitted Lower Back Pain Case",
    description: "Requested a second opinion for lower back pain",
    type: "submission",
    caseId: "CASE-1232",
  },
  {
    id: 6,
    date: "Mar 12, 2025",
    title: "Specialist Assigned",
    description: "Dr. Michael Chen (Orthopedic Surgeon) assigned to your case",
    type: "assignment",
    caseId: "CASE-1232",
  },
]

export function HealthTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Timeline</CardTitle>
        <CardDescription>Recent activity on your cases</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6 border-l space-y-6">
          {timelineEvents.map((event) => (
            <div key={event.id} className="relative pb-1">
              <div className="absolute -left-[25px] p-1 rounded-full bg-white border">
                {event.type === "submission" && <FileText className="h-4 w-4 text-blue-500" />}
                {event.type === "assignment" && <Clock className="h-4 w-4 text-amber-500" />}
                {event.type === "completion" && <CheckCircle className="h-4 w-4 text-green-500" />}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{event.title}</span>
                  <Badge variant="outline" className="text-xs">
                    {event.caseId}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{event.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

