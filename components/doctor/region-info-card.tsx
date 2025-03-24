"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, AlertCircle, Info } from "lucide-react"
import { regions, type RegionCode, useRegion } from "@/contexts/region-context"

interface RegionInfoCardProps {
  doctorRegions: RegionCode[]
}

export function RegionInfoCard({ doctorRegions }: RegionInfoCardProps) {
  const { currentRegion } = useRegion()

  // Group regions by continent for better organization
  const continents = {
    "North America": ["US", "CA"],
    Europe: ["EU", "UK"],
    "Asia Pacific": ["AU", "ASIA"],
    Africa: ["AFRICA"],
    "South America": ["SOUTH_AMERICA"],
    Other: ["OTHER"],
  }

  // Calculate region-specific metrics
  const regionMetrics = doctorRegions.map((regionCode) => {
    const region = regions[regionCode]
    const isCurrentRegion = regionCode === currentRegion.code
    const isCrossBorder = currentRegion.allowedCrossBorderRegions.includes(regionCode)
    const isAccessible = isCurrentRegion || isCrossBorder

    return {
      region,
      isCurrentRegion,
      isCrossBorder,
      isAccessible,
    }
  })

  // Count accessible and inaccessible regions
  const accessibleRegions = regionMetrics.filter((m) => m.isAccessible).length
  const inaccessibleRegions = regionMetrics.filter((m) => !m.isAccessible).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Regional Practice Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {doctorRegions.map((regionCode) => (
            <Badge
              key={regionCode}
              variant={regionCode === currentRegion.code ? "default" : "outline"}
              className={regionCode === currentRegion.code ? "" : ""}
            >
              {regions[regionCode].name}
              {regionCode === currentRegion.code && " (Current)"}
            </Badge>
          ))}
        </div>

        {accessibleRegions > 0 && inaccessibleRegions > 0 && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-700 font-medium">Cross-Border Practice</p>
              <p className="text-sm text-blue-600">
                This doctor is licensed to practice in multiple regions. Some regions may have different pricing and
                regulatory requirements.
              </p>
            </div>
          </div>
        )}

        {inaccessibleRegions > 0 && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-700 font-medium">Region Restrictions</p>
              <p className="text-sm text-amber-600">
                This doctor practices in some regions that are not accessible from your current region due to
                cross-border regulatory restrictions.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Regional Availability</h3>

          {Object.entries(continents).map(([continent, regionCodes]) => {
            const continentRegions = doctorRegions.filter((r) => regionCodes.includes(r))

            if (continentRegions.length === 0) return null

            return (
              <div key={continent} className="space-y-1">
                <h4 className="text-xs text-muted-foreground">{continent}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {continentRegions.map((regionCode) => {
                    const region = regions[regionCode]
                    const isCurrentRegion = regionCode === currentRegion.code
                    const isCrossBorder = currentRegion.allowedCrossBorderRegions.includes(regionCode)
                    const isAccessible = isCurrentRegion || isCrossBorder

                    return (
                      <div
                        key={regionCode}
                        className={`p-2 border rounded-md ${
                          isCurrentRegion
                            ? "bg-primary/10 border-primary/20"
                            : isAccessible
                              ? "bg-blue-50 border-blue-200"
                              : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{region.name}</span>
                          {isCurrentRegion && (
                            <Badge variant="default" className="text-xs">
                              Current
                            </Badge>
                          )}
                          {isCrossBorder && !isCurrentRegion && (
                            <Badge variant="outline" className="text-xs">
                              Cross-border
                            </Badge>
                          )}
                          {!isAccessible && (
                            <Badge variant="outline" className="text-xs bg-gray-100">
                              Restricted
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Currency: {region.currency} ({region.currencySymbol})
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

