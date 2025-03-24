"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Star, Search, Globe, Video, Filter } from "lucide-react"
import { type RegionCode, regions, useRegion } from "@/contexts/region-context"
import Link from "next/link"

// Mock data for doctors
const mockDoctors = [
  {
    id: "D-1001",
    name: "Dr. Jane Smith",
    initials: "JS",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 142,
    regions: ["US", "CA", "SOUTH_AMERICA"] as RegionCode[],
    videoConsultation: true,
    languages: ["English", "Spanish", "Portuguese"],
  },
  {
    id: "D-1002",
    name: "Dr. Michael Chen",
    initials: "MC",
    specialty: "Neurologist",
    rating: 4.8,
    reviews: 98,
    regions: ["US", "ASIA"] as RegionCode[],
    videoConsultation: true,
    languages: ["English", "Mandarin"],
  },
  {
    id: "D-1003",
    name: "Dr. Sarah Johnson",
    initials: "SJ",
    specialty: "Oncologist",
    rating: 4.7,
    reviews: 115,
    regions: ["UK", "EU"] as RegionCode[],
    videoConsultation: true,
    languages: ["English", "French"],
  },
  {
    id: "D-1004",
    name: "Dr. Ahmed Hassan",
    initials: "AH",
    specialty: "Orthopedic Surgeon",
    rating: 4.9,
    reviews: 87,
    regions: ["AFRICA", "EU", "UK"] as RegionCode[],
    videoConsultation: true,
    languages: ["English", "Arabic", "French"],
  },
  {
    id: "D-1005",
    name: "Dr. Carlos Rodriguez",
    initials: "CR",
    specialty: "Cardiologist",
    rating: 4.6,
    reviews: 76,
    regions: ["SOUTH_AMERICA", "US"] as RegionCode[],
    videoConsultation: true,
    languages: ["English", "Spanish", "Portuguese"],
  },
  {
    id: "D-1006",
    name: "Dr. Emma Wilson",
    initials: "EW",
    specialty: "Dermatologist",
    rating: 4.8,
    reviews: 104,
    regions: ["AU", "ASIA"] as RegionCode[],
    videoConsultation: false,
    languages: ["English"],
  },
]

export function DoctorListing() {
  const { currentRegion, availableRegions } = useRegion()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | undefined>()
  const [showVideoOnly, setShowVideoOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRegions, setSelectedRegions] = useState<RegionCode[]>([])

  // Filter doctors based on search, specialty, video consultation, and regions
  const filteredDoctors = mockDoctors.filter((doctor) => {
    // Filter by search term
    if (
      searchTerm &&
      !doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Filter by specialty
    if (selectedSpecialty && doctor.specialty !== selectedSpecialty) {
      return false
    }

    // Filter by video consultation
    if (showVideoOnly && !doctor.videoConsultation) {
      return false
    }

    // Filter by regions
    if (selectedRegions.length > 0) {
      const hasSelectedRegion = doctor.regions.some((region) => selectedRegions.includes(region))
      if (!hasSelectedRegion) {
        return false
      }
    } else {
      // If no regions are selected, only show doctors available in current or cross-border regions
      const isAvailableInRegion = doctor.regions.some(
        (region) => region === currentRegion.code || availableRegions.some((r) => r.code === region),
      )
      if (!isAvailableInRegion) {
        return false
      }
    }

    return true
  })

  // Get unique specialties for the filter
  const specialties = Array.from(new Set(mockDoctors.map((doctor) => doctor.specialty)))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search doctors by name or specialty"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>

          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Specialties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium">Consultation Type</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="video-consultation"
                    checked={showVideoOnly}
                    onCheckedChange={(checked) => setShowVideoOnly(checked as boolean)}
                  />
                  <Label htmlFor="video-consultation">Video Consultation Available</Label>
                </div>
              </div>

              <div className="space-y-4 col-span-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Regions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.values(regions).map((region) => (
                    <div key={region.code} className="flex items-center space-x-2">
                      <Checkbox
                        id={`region-${region.code}`}
                        checked={selectedRegions.includes(region.code)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRegions((prev) => [...prev, region.code])
                          } else {
                            setSelectedRegions((prev) => prev.filter((r) => r !== region.code))
                          }
                        }}
                      />
                      <Label htmlFor={`region-${region.code}`}>{region.name}</Label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedRegions([])}>
                    Clear All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRegions(availableRegions.map((r) => r.code))}
                  >
                    Select Available Regions
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDoctors.map((doctor) => {
          // Check if doctor is available in the current region or cross-border allowed regions
          const isAvailableInRegion = doctor.regions.some(
            (region) => region === currentRegion.code || availableRegions.some((r) => r.code === region),
          )

          return (
            <Card key={doctor.id} className={!isAvailableInRegion ? "opacity-70" : ""}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{doctor.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{doctor.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <Badge variant="outline">{doctor.specialty}</Badge>
                      <div className="flex items-center text-amber-500 text-sm">
                        <Star className="fill-amber-500 h-3 w-3 mr-1" />
                        {doctor.rating} ({doctor.reviews})
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {doctor.regions.map((regionCode) => {
                        const isCurrentRegion = regionCode === currentRegion.code
                        const isCrossBorder = currentRegion.allowedCrossBorderRegions.includes(regionCode)

                        return (
                          <Badge key={regionCode} variant={isCurrentRegion ? "default" : "outline"} className="text-xs">
                            {regions[regionCode].name}
                          </Badge>
                        )
                      })}

                      {doctor.videoConsultation && (
                        <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 text-xs">
                          <Video className="h-3 w-3 mr-1" />
                          Video
                        </Badge>
                      )}
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">Languages: {doctor.languages.join(", ")}</div>
                      <Button size="sm" asChild>
                        <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No doctors found matching your criteria.</p>
          <Button
            variant="link"
            onClick={() => {
              setSearchTerm("")
              setSelectedSpecialty(undefined)
              setShowVideoOnly(false)
              setSelectedRegions([])
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}

