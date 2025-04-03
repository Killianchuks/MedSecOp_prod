"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { type RegionCode, regions } from "@/contexts/region-context"
import { AlertCircle, Globe, Info } from "lucide-react"

interface DoctorRegionFormProps {
  onSave: (regions: RegionCode[], notes: string) => void
  initialRegions?: RegionCode[]
  initialNotes?: string
}

export function DoctorRegionForm({ onSave, initialRegions = [], initialNotes = "" }: DoctorRegionFormProps) {
  const [selectedRegions, setSelectedRegions] = useState<RegionCode[]>(initialRegions)
  const [crossBorderNotes, setCrossBorderNotes] = useState(initialNotes)

  const handleRegionChange = (region: RegionCode, checked: boolean) => {
    if (checked) {
      setSelectedRegions((prev) => [...prev, region])
    } else {
      setSelectedRegions((prev) => prev.filter((r) => r !== region))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(selectedRegions, crossBorderNotes)
  }

  // Group regions by continent for better organization
  const continents: Record<string, RegionCode[]> = {
    "North America": ["us" as RegionCode, "canada" as RegionCode],
    Europe: ["eu" as RegionCode, "uk" as RegionCode],
    "Asia Pacific": ["australia" as RegionCode, "asia" as RegionCode],
    Africa: ["africa" as RegionCode],
    "South America": ["south_america" as RegionCode],
    Other: ["global" as RegionCode],
  }

  // Add safety check for rendering regions
  const renderRegion = (regionCode: RegionCode) => {
    if (!regions[regionCode]) {
      console.warn(`Region not found: ${regionCode}`)
      return null
    }

    const region = regions[regionCode]
    return (
      <div key={region.code} className="flex items-start space-x-3 p-3 border rounded-md">
        <Checkbox
          id={`region-${region.code}`}
          checked={selectedRegions.includes(regionCode)}
          onCheckedChange={(checked) => handleRegionChange(regionCode, checked as boolean)}
        />
        <div className="space-y-1">
          <Label htmlFor={`region-${region.code}`} className="font-medium cursor-pointer">
            {region.name}
          </Label>
          {region.currencySymbol && (
            <p className="text-xs text-muted-foreground">
              Currency: {region.currencyCode} ({region.currencySymbol})
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Cross-border access:{" "}
            {region.allowedCrossBorderRegions.length > 0
              ? region.allowedCrossBorderRegions.map((r) => regions[r as RegionCode]?.name || r).join(", ")
              : "None"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Regional Availability
          </CardTitle>
          <CardDescription>
            Select the regions where you are licensed to practice and provide medical opinions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-700">Cross-Border Practice Information</h4>
                <p className="text-sm text-blue-600">
                  Please only select regions where you are legally permitted to provide medical opinions. Different
                  regions have different regulatory requirements for telemedicine and second opinions.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(continents).map(([continent, regionCodes]) => (
              <div key={continent} className="space-y-2">
                <h3 className="text-sm font-semibold">{continent}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{regionCodes.map(renderRegion)}</div>
              </div>
            ))}
          </div>

          {selectedRegions.length > 1 && (
            <div className="space-y-2">
              <Label htmlFor="cross-border-notes">Cross-Border Practice Notes</Label>
              <Textarea
                id="cross-border-notes"
                placeholder="Provide any additional information about your cross-border practice, such as specific limitations or requirements"
                value={crossBorderNotes}
                onChange={(e) => setCrossBorderNotes(e.target.value)}
                rows={3}
              />
            </div>
          )}

          {selectedRegions.length === 0 && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700">
                Please select at least one region where you are licensed to practice.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={selectedRegions.length === 0}>
            Save Regional Settings
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

