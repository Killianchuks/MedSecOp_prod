"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, AlertCircle, Info } from "lucide-react";

// Define the Region type
type RegionCode = "US" | "CA" | "EU" | "UK" | "AU" | "ASIA" | "AFRICA" | "SOUTH_AMERICA" | "OTHER";

type Region = {
  code: RegionCode;
  name: string;
  allowedCrossBorderRegions: RegionCode[];
  currency: string;
  currencySymbol: string;
};

// Hardcoded region data
const regions: Record<RegionCode, Region> = {
  US: { code: "US", name: "United States", allowedCrossBorderRegions: ["CA"], currency: "USD", currencySymbol: "$" },
  CA: { code: "CA", name: "Canada", allowedCrossBorderRegions: ["US"], currency: "CAD", currencySymbol: "C$" },
  EU: { code: "EU", name: "European Union", allowedCrossBorderRegions: ["UK"], currency: "EUR", currencySymbol: "€" },
  UK: { code: "UK", name: "United Kingdom", allowedCrossBorderRegions: ["EU"], currency: "GBP", currencySymbol: "£" },
  AU: { code: "AU", name: "Australia", allowedCrossBorderRegions: ["ASIA"], currency: "AUD", currencySymbol: "A$" },
  ASIA: { code: "ASIA", name: "Asia", allowedCrossBorderRegions: ["AU"], currency: "JPY", currencySymbol: "¥" },
  AFRICA: { code: "AFRICA", name: "Africa", allowedCrossBorderRegions: [], currency: "ZAR", currencySymbol: "R" },
  SOUTH_AMERICA: { code: "SOUTH_AMERICA", name: "South America", allowedCrossBorderRegions: [], currency: "BRL", currencySymbol: "R$" },
  OTHER: { code: "OTHER", name: "Other Regions", allowedCrossBorderRegions: [], currency: "N/A", currencySymbol: "-" },
};

// Set the user's current region
const currentRegion: Region = regions["US"]; // Change this to dynamically get the user's region

interface RegionInfoCardProps {
  doctorRegions: RegionCode[];
}

export function RegionInfoCard({ doctorRegions }: RegionInfoCardProps) {
  const continents = {
    "North America": ["US", "CA"],
    Europe: ["EU", "UK"],
    "Asia Pacific": ["AU", "ASIA"],
    Africa: ["AFRICA"],
    "South America": ["SOUTH_AMERICA"],
    Other: ["OTHER"],
  };

  const regionMetrics = doctorRegions.map((regionCode) => {
    const region = regions[regionCode];
    const isCurrentRegion = regionCode === currentRegion.code;
    const isCrossBorder = currentRegion.allowedCrossBorderRegions.includes(regionCode);
    const isAccessible = isCurrentRegion || isCrossBorder;

    return {
      region,
      isCurrentRegion,
      isCrossBorder,
      isAccessible,
    };
  });

  const accessibleRegions = regionMetrics.filter((m) => m.isAccessible).length;
  const inaccessibleRegions = regionMetrics.filter((m) => !m.isAccessible).length;

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
                This doctor is licensed to practice in multiple regions. Some regions may have different pricing and regulatory requirements.
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
                This doctor practices in some regions that are not accessible from your current region due to cross-border regulatory restrictions.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Regional Availability</h3>

          {Object.entries(continents).map(([continent, regionCodes]) => {
            const continentRegions = doctorRegions.filter((r) => regionCodes.includes(r));

            if (continentRegions.length === 0) return null;

            return (
              <div key={continent} className="space-y-1">
                <h4 className="text-xs text-muted-foreground">{continent}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {continentRegions.map((regionCode) => {
                    const region = regions[regionCode];
                    const isCurrentRegion = regionCode === currentRegion.code;
                    const isCrossBorder = currentRegion.allowedCrossBorderRegions.includes(regionCode);
                    const isAccessible = isCurrentRegion || isCrossBorder;

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
                          {isCurrentRegion && <Badge variant="default" className="text-xs">Current</Badge>}
                          {isCrossBorder && !isCurrentRegion && <Badge variant="outline" className="text-xs">Cross-border</Badge>}
                          {!isAccessible && <Badge variant="outline" className="text-xs bg-gray-100">Restricted</Badge>}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Currency: {region.currency} ({region.currencySymbol})
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
