"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Export the RegionCode enum so it can be imported elsewhere
export enum RegionCode {
  US = "us",
  EU = "eu",
  UK = "uk",
  CANADA = "canada",
  ASIA = "asia",
  AUSTRALIA = "australia",
  AFRICA = "africa",
  SOUTH_AMERICA = "south_america",
  GLOBAL = "global",
}

export interface ServicePricing {
  secondOpinion: number
  videoConsultation: number
  medicalRecordReview: number
  specialistConsultation: number
}

export interface Region {
  code: RegionCode
  name: string
  currencyCode: string
  currencySymbol: string
  basePrice: number
  baseServicePricing: ServicePricing
  formatPrice: (price: number) => string
  allowedCrossBorderRegions: RegionCode[]
}

// Define regions
export const regions: { [key in RegionCode]: Region } = {
  [RegionCode.US]: {
    code: RegionCode.US,
    name: "United States",
    currencyCode: "USD",
    currencySymbol: "$",
    basePrice: 299,
    baseServicePricing: {
      secondOpinion: 299,
      videoConsultation: 199,
      medicalRecordReview: 249,
      specialistConsultation: 349,
    },
    formatPrice: (price) => `$${price.toFixed(2)}`,
    allowedCrossBorderRegions: [RegionCode.CANADA, RegionCode.SOUTH_AMERICA],
  },
  [RegionCode.EU]: {
    code: RegionCode.EU,
    name: "European Union",
    currencyCode: "EUR",
    currencySymbol: "€",
    basePrice: 269,
    baseServicePricing: {
      secondOpinion: 269,
      videoConsultation: 179,
      medicalRecordReview: 229,
      specialistConsultation: 319,
    },
    formatPrice: (price) => `€${price.toFixed(2)}`,
    allowedCrossBorderRegions: [RegionCode.UK, RegionCode.AFRICA],
  },
  [RegionCode.UK]: {
    code: RegionCode.UK,
    name: "United Kingdom",
    currencyCode: "GBP",
    currencySymbol: "£",
    basePrice: 239,
    baseServicePricing: {
      secondOpinion: 239,
      videoConsultation: 159,
      medicalRecordReview: 199,
      specialistConsultation: 289,
    },
    formatPrice: (price) => `£${price.toFixed(2)}`,
    allowedCrossBorderRegions: [RegionCode.EU],
  },
  [RegionCode.CANADA]: {
    code: RegionCode.CANADA,
    name: "Canada",
    currencyCode: "CAD",
    currencySymbol: "C$",
    basePrice: 379,
    baseServicePricing: {
      secondOpinion: 379,
      videoConsultation: 249,
      medicalRecordReview: 329,
      specialistConsultation: 429,
    },
    formatPrice: (price) => `C$${price.toFixed(2)}`,
    allowedCrossBorderRegions: [RegionCode.US],
  },
  [RegionCode.ASIA]: {
    code: RegionCode.ASIA,
    name: "Asia",
    currencyCode: "USD",
    currencySymbol: "$",
    basePrice: 249,
    baseServicePricing: {
      secondOpinion: 249,
      videoConsultation: 169,
      medicalRecordReview: 219,
      specialistConsultation: 299,
    },
    formatPrice: (price) => `$${price.toFixed(2)}`,
    allowedCrossBorderRegions: [RegionCode.AUSTRALIA],
  },
  [RegionCode.AUSTRALIA]: {
    code: RegionCode.AUSTRALIA,
    name: "Australia & New Zealand",
    currencyCode: "AUD",
    currencySymbol: "A$",
    basePrice: 399,
    baseServicePricing: {
      secondOpinion: 399,
      videoConsultation: 269,
      medicalRecordReview: 349,
      specialistConsultation: 449,
    },
    formatPrice: (price) => `A$${price.toFixed(2)}`,
    allowedCrossBorderRegions: [RegionCode.ASIA],
  },
  [RegionCode.AFRICA]: {
    code: RegionCode.AFRICA,
    name: "Africa",
    currencyCode: "USD",
    currencySymbol: "$",
    basePrice: 199,
    baseServicePricing: {
      secondOpinion: 199,
      videoConsultation: 129,
      medicalRecordReview: 169,
      specialistConsultation: 249,
    },
    formatPrice: (price) => `$${price.toFixed(2)}`,
    allowedCrossBorderRegions: [RegionCode.EU],
  },
  [RegionCode.SOUTH_AMERICA]: {
    code: RegionCode.SOUTH_AMERICA,
    name: "South America",
    currencyCode: "USD",
    currencySymbol: "$",
    basePrice: 219,
    baseServicePricing: {
      secondOpinion: 219,
      videoConsultation: 149,
      medicalRecordReview: 189,
      specialistConsultation: 269,
    },
    formatPrice: (price) => `$${price.toFixed(2)}`,
    allowedCrossBorderRegions: [RegionCode.US],
  },
  [RegionCode.GLOBAL]: {
    code: RegionCode.GLOBAL,
    name: "Global",
    currencyCode: "USD",
    currencySymbol: "$",
    basePrice: 299,
    baseServicePricing: {
      secondOpinion: 299,
      videoConsultation: 199,
      medicalRecordReview: 249,
      specialistConsultation: 349,
    },
    formatPrice: (price) => `$${price.toFixed(2)}`,
    allowedCrossBorderRegions: [],
  },
}

// Create the context
interface RegionContextType {
  currentRegion: Region
  setRegion: (code: RegionCode) => void
  availableRegions: Region[]
  isLoading: boolean
}

const RegionContext = createContext<RegionContextType | undefined>(undefined)

// Provider component
export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [currentRegion, setCurrentRegion] = useState<Region>(regions[RegionCode.US])
  const [isLoading, setIsLoading] = useState(true)
  const availableRegions = Object.values(regions)

  // Function to set the region
  const setRegion = (code: RegionCode) => {
    if (regions[code]) {
      setCurrentRegion(regions[code])
      // Save to localStorage for persistence
      if (typeof window !== "undefined") {
        localStorage.setItem("preferredRegion", code)
      }
    }
  }

  // Initialize from localStorage or geolocation on client side
  useEffect(() => {
    const storedRegion = typeof window !== "undefined" ? localStorage.getItem("preferredRegion") : null
    if (storedRegion && regions[storedRegion as RegionCode]) {
      setCurrentRegion(regions[storedRegion as RegionCode])
    } else {
      // Geolocation logic would go here in a real application
      // For now, default to US
      setCurrentRegion(regions[RegionCode.US])
    }
    setIsLoading(false)
  }, [])

  return (
    <RegionContext.Provider value={{ currentRegion, setRegion, availableRegions, isLoading }}>
      {children}
    </RegionContext.Provider>
  )
}

// Custom hook to use the region context
export function useRegion() {
  const context = useContext(RegionContext)
  if (context === undefined) {
    throw new Error("useRegion must be used within a RegionProvider")
  }
  return context
}

