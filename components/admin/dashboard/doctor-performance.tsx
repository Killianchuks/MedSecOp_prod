import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Star } from "lucide-react"

const topDoctors = [
  {
    id: 1,
    name: "Dr. Jane Smith",
    initials: "JS",
    specialty: "Cardiologist",
    casesCompleted: 142,
    averageRating: 4.9,
    responseTime: "24 hours",
    status: "Active",
    completionRate: 98,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    initials: "MC",
    specialty: "Orthopedic Surgeon",
    casesCompleted: 128,
    averageRating: 4.8,
    responseTime: "36 hours",
    status: "Active",
    completionRate: 95,
  },
  {
    id: 3,
    name: "Dr. Emily Davis",
    initials: "ED",
    specialty: "Dermatologist",
    casesCompleted: 115,
    averageRating: 4.7,
    responseTime: "18 hours",
    status: "Active",
    completionRate: 97,
  },
  {
    id: 4,
    name: "Dr. Robert Wilson",
    initials: "RW",
    specialty: "Endocrinologist",
    casesCompleted: 98,
    averageRating: 4.6,
    responseTime: "30 hours",
    status: "Active",
    completionRate: 92,
  },
]

export function DoctorPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Doctors</CardTitle>
        <CardDescription>Doctors with highest ratings and case completion</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topDoctors.map((doctor) => (
            <div key={doctor.id} className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{doctor.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{doctor.name}</h4>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                  {doctor.status}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <CheckCircle className="h-3 w-3" />
                    <span>Completed</span>
                  </div>
                  <span className="font-medium">{doctor.casesCompleted} cases</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Star className="h-3 w-3" />
                    <span>Rating</span>
                  </div>
                  <span className="font-medium">{doctor.averageRating}/5.0</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Response</span>
                  </div>
                  <span className="font-medium">{doctor.responseTime}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Completion Rate</span>
                  <span className="font-medium">{doctor.completionRate}%</span>
                </div>
                <Progress value={doctor.completionRate} className="h-1.5" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Button variant="outline" className="w-full">
            View All Doctors
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

