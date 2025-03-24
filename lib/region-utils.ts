"use client"

// This file handles region detection with graceful fallbacks for browser usage

// Function to get the current region from localStorage with browser fallback
export function detectRegionFromBrowser(): string {
  if (typeof window === "undefined") return "US"

  try {
    // First try to get region from localStorage
    const savedRegion = localStorage.getItem("region")
    if (savedRegion) return savedRegion

    // Otherwise try browser language detection
    const language = navigator.language || "en-US"

    // Simple mapping based on language/locale
    if (language.includes("-US") || language === "en") return "US"
    if (language.includes("-GB")) return "UK"
    if (language.includes("-CA")) return "CANADA"
    if (language.includes("-AU") || language.includes("-NZ")) return "AUSTRALIA"
    if (
      language.includes("-IN") ||
      language.includes("-JP") ||
      language.includes("-CN") ||
      language.includes("-KR") ||
      language.includes("-TH") ||
      language.includes("-VN") ||
      language.includes("-MY") ||
      language.includes("-SG")
    )
      return "ASIA"
    if (
      language.includes("-ZA") ||
      language.includes("-NG") ||
      language.includes("-EG") ||
      language.includes("-MA") ||
      language.includes("-KE")
    )
      return "AFRICA"
    if (
      language.includes("-BR") ||
      language.includes("-AR") ||
      language.includes("-CL") ||
      language.includes("-CO") ||
      language.includes("-MX") ||
      language.includes("-PE")
    )
      return "SOUTH_AMERICA"

    // European languages/countries
    if (
      language.includes("-DE") ||
      language.includes("-FR") ||
      language.includes("-IT") ||
      language.includes("-ES") ||
      language.includes("-PT") ||
      language.includes("-NL") ||
      language.includes("-BE") ||
      language.includes("-SE") ||
      language.includes("-DK") ||
      language.includes("-NO") ||
      language.includes("-FI") ||
      language.includes("-AT") ||
      language.includes("-CH") ||
      language.includes("-IE") ||
      language.includes("-PL") ||
      language.includes("-CZ")
    )
      return "EU"

    // Default to US for unknown regions
    return "US"
  } catch (error) {
    console.error("Error detecting region from browser:", error)
    return "US"
  }
}

// Clear region cache
export function clearRegionCache(): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem("region")
    }
  } catch (error) {
    console.error("Error clearing region cache:", error)
  }
}

// Check if a region code is valid
export function isValidRegion(regionCode: string): boolean {
  const validRegions = ["US", "UK", "EU", "CANADA", "ASIA", "AUSTRALIA", "AFRICA", "SOUTH_AMERICA"]
  return validRegions.includes(regionCode)
}

