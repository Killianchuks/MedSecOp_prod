"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Video, Star, Clock, User, Mail, ExternalLink, Globe, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useRegion, RegionCode, regions } from "@/contexts/region-context"

interface DoctorProfileProps {
  doctorId: string
}

export function DoctorProfile({ doctorId }: DoctorProfileProps) {
  const [showCalendar, setShowCalendar] = useState(false)
  const { currentRegion, availableRegions } = useRegion()

  // This would be fetched from an API in a real implementation
  const doctor = {
    id: "D-1001",
    name: "Dr. Jane Smith",
    initials: "JS",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 142,
    bio: "Board-certified cardiologist with over 15 years of experience specializing in interventional cardiology and heart failure management. Fellow of the American College of Cardiology and published researcher with a focus on preventive cardiology.",
    credentials: [
      "MD, Stanford University School of Medicine",
      "FACC - Fellow of the American College of Cardiology",
      "Board Certified in Cardiovascular Disease",
      "Board Certified in Interventional Cardiology",
    ],
    regions: [RegionCode.US, RegionCode.CANADA, RegionCode.SOUTH_AMERICA],
    consultations: {
      available: true,
      hourlyRate: 250,
      calendarLink: "https://calendly.com/dr-jane-smith",
      languages: ["English", "Spanish", "Portuguese"],
      notes:
        "Available for 30-minute or 60-minute consultations to discuss your cardiovascular health, treatment options, and any questions you may have about your diagnosis or care plan.",
    },
  }

  // Check if doctor is available in the current region or cross-border allowed regions
  const isAvailableInRegion = doctor.regions.some(
    (region) => region === currentRegion.code || availableRegions.some((r) => r.code === region),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-xl">{doctor.initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{doctor.name}</CardTitle>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <Badge variant="outline">{doctor.specialty}</Badge>
              <div className="flex items-center text-amber-500">
                <Star className="fill-amber-500 h-4 w-4" />
                <span className="ml-1 text-sm">
                  {doctor.rating} ({doctor.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-700">{doctor.bio}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Credentials</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {doctor.credentials.map((credential, index) => (
              <li key={index}>{credential}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Available Regions
          </h3>
          <div className="flex flex-wrap gap-2">
            {doctor.regions.map((regionCode) => (
              <Badge key={regionCode} variant="outline">
                {regions[regionCode].name}
              </Badge>
            ))}
          </div>

          {!isAvailableInRegion && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-700 font-medium">Region Restriction</p>
                <p className="text-sm text-amber-600">
                  This specialist is not available in your current region due to cross-border regulatory restrictions.
                </p>
              </div>
            </div>
          )}
        </div>

        {doctor.consultations.available && isAvailableInRegion && (
          <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-blue-800">
              <Video className="h-5 w-5" />
              Video Consultation Available
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-blue-700">
                  {currentRegion.formatPrice(doctor.consultations.hourlyRate)} per hour
                </span>
              </div>

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-600" />
                <span className="text-blue-700">Languages: {doctor.consultations.languages.join(", ")}</span>
              </div>

              {doctor.consultations.notes && <p className="text-blue-700 text-sm mt-2">{doctor.consultations.notes}</p>}

              {showCalendar ? (
                <div className="mt-4 border rounded-lg p-4 bg-white">
                  <div className="text-center pb-4 border-b mb-4">
                    <h4 className="font-medium">Select a Consultation Time</h4>
                    <p className="text-sm text-gray-500">Choose from available slots in the doctor's calendar</p>
                  </div>

                  <div className="flex justify-center">
                    {/* Removed iframe and replaced with a message */}
                    <div className="text-center p-4 border rounded bg-gray-50 w-full">
                      <p className="mb-2">Calendar loading is disabled in this preview.</p>
                      <p className="text-sm text-gray-500">
                        In the actual implementation, the doctor's Calendly calendar would be displayed here.
                      </p>
                    </div>
                  </div>

                  <Button variant="outline" className="mt-4 w-full" onClick={() => setShowCalendar(false)}>
                    Close Calendar
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-4">
                  <Button onClick={() => setShowCalendar(true)} className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Availability & Schedule
                  </Button>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`mailto:schedule@medsecop.com?subject=Consultation with ${doctor.name}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Contact for Scheduling
                    </Link>
                  </Button>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href={doctor.consultations.calendarLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Calendar in New Window
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

