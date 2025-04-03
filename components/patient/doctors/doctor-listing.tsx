"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RegionCode, regions } from "@/contexts/region-context"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

// Define the doctor interface
interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  reviewCount: number
  availableRegions: RegionCode[]
  imageUrl: string
  nextAvailable: string
  hospital: string
  location: string
  languages: string[]
  verified: boolean
}

export function DoctorListing() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [activeRegion, setActiveRegion] = useState<RegionCode>(RegionCode.US)

  // Fetch doctors data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // Replace with your actual API call
        // For now, we'll use mock data
        const mockDoctors: Doctor[] = [
          {
            id: "doc1",
            name: "Dr. Sarah Johnson",
            specialty: "Cardiology",
            rating: 4.8,
            reviewCount: 124,
            availableRegions: [RegionCode.US, RegionCode.CANADA],
            imageUrl: "/placeholder.svg?height=80&width=80",
            nextAvailable: "Tomorrow",
            hospital: "Memorial Hospital",
            location: "New York, NY",
            languages: ["English", "Spanish"],
            verified: true,
          },
          {
            id: "doc2",
            name: "Dr. Michael Chen",
            specialty: "Oncology",
            rating: 4.9,
            reviewCount: 98,
            availableRegions: [RegionCode.US, RegionCode.EU, RegionCode.ASIA],
            imageUrl: "/placeholder.svg?height=80&width=80",
            nextAvailable: "Today",
            hospital: "University Medical Center",
            location: "San Francisco, CA",
            languages: ["English", "Mandarin"],
            verified: true,
          },
          {
            id: "doc3",
            name: "Dr. Emily Rodriguez",
            specialty: "Neurology",
            rating: 4.7,
            reviewCount: 87,
            availableRegions: [RegionCode.EU, RegionCode.UK],
            imageUrl: "/placeholder.svg?height=80&width=80",
            nextAvailable: "In 2 days",
            hospital: "European Medical Institute",
            location: "London, UK",
            languages: ["English", "French", "Spanish"],
            verified: true,
          },
        ]

        setDoctors(mockDoctors)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching doctors:", error)
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  // Filter doctors by region
  const filteredDoctors = doctors.filter((doctor) => doctor.availableRegions.includes(activeRegion))

  // Available regions for filtering
  const availableRegions: RegionCode[] = [
    RegionCode.US,
    RegionCode.EU,
    RegionCode.UK,
    RegionCode.CANADA,
    RegionCode.ASIA,
    RegionCode.AUSTRALIA,
  ]

  if (loading) {
    return <div className="text-center py-10">Loading doctors...</div>
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeRegion} onValueChange={(value) => setActiveRegion(value as RegionCode)}>
        <TabsList className="mb-4">
          {availableRegions.map((region) => (
            <TabsTrigger key={region} value={region}>
              {regions[region].name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeRegion} className="space-y-4">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <Card key={doctor.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Avatar className="h-20 w-20">
                      <img src={doctor.imageUrl || "/placeholder.svg"} alt={doctor.name} />
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-semibold">{doctor.name}</h3>
                          <p className="text-muted-foreground">{doctor.specialty}</p>
                        </div>

                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{doctor.rating}</span>
                          <span className="text-muted-foreground">({doctor.reviewCount} reviews)</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {doctor.verified && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Verified
                          </Badge>
                        )}

                        <Badge variant="outline" className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {doctor.location}
                        </Badge>

                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Available {doctor.nextAvailable}
                        </Badge>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pt-2">
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Languages:</span> {doctor.languages.join(", ")}
                        </div>

                        <Link href={`/doctors/${doctor.id}`}>
                          <Button size="sm" className="w-full md:w-auto">
                            View Profile <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">No doctors available in this region.</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

