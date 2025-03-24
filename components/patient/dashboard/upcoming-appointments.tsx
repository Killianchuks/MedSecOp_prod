import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Video, Phone, Clock } from "lucide-react"

const appointments = [
  {
    id: 1,
    date: "Mar 20, 2025",
    time: "10:00 AM",
    doctor: {
      name: "Dr. Jane Smith",
      initials: "JS",
      specialty: "Cardiologist",
    },
    type: "Video",
    caseId: "CASE-1234",
    purpose: "Follow-up on Atrial Fibrillation Second Opinion",
  },
  {
    id: 2,
    date: "Mar 25, 2025",
    time: "2:30 PM",
    doctor: {
      name: "Dr. Michael Chen",
      initials: "MC",
      specialty: "Orthopedic Surgeon",
    },
    type: "Phone",
    caseId: "CASE-1232",
    purpose: "Discussion of Lower Back Pain Treatment Options",
  },
]

export function UpcomingAppointments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>Scheduled follow-up consultations</CardDescription>
      </CardHeader>
      <CardContent>
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>{appointment.doctor.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{appointment.doctor.name}</h4>
                    <p className="text-sm text-muted-foreground">{appointment.doctor.specialty}</p>
                    <p className="text-sm mt-1">{appointment.purpose}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center text-xs">
                        <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1 text-sm">
                    {appointment.type === "Video" ? (
                      <Video className="h-4 w-4 text-primary" />
                    ) : (
                      <Phone className="h-4 w-4 text-primary" />
                    )}
                    <span>{appointment.type} Call</span>
                  </div>
                  <Button size="sm">Join Call</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Calendar className="h-10 w-10 text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-medium">No Upcoming Appointments</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              You don't have any scheduled appointments at the moment.
            </p>
            <Button className="mt-4">Schedule Appointment</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

