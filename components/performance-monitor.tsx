"use client"

import { useEffect, useState } from "react"
import { analytics } from "@/lib/analytics"

// Component to monitor and report performance metrics
export function PerformanceMonitor() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== "development") {
      return
    }

    // Check if performance API is available
    if (typeof window === "undefined" || !("performance" in window)) {
      return
    }

    // Track performance metrics
    const trackPerformance = () => {
      try {
        // Get navigation timing
        const perfEntries = performance.getEntriesByType("navigation")
        if (perfEntries.length > 0) {
          const navigationEntry = perfEntries[0] as PerformanceNavigationTiming

          // Track key metrics
          const metrics = {
            pageLoadTime: navigationEntry.loadEventEnd - navigationEntry.startTime,
            ttfb: navigationEntry.responseStart - navigationEntry.requestStart,
            domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime,
            firstPaint: 0,
            firstContentfulPaint: 0,
            largestContentfulPaint: 0,
          }

          // Get paint metrics
          const paintEntries = performance.getEntriesByType("paint")
          paintEntries.forEach((entry) => {
            const paintEntry = entry as PerformancePaintTiming
            if (paintEntry.name === "first-paint") {
              metrics.firstPaint = paintEntry.startTime
            } else if (paintEntry.name === "first-contentful-paint") {
              metrics.firstContentfulPaint = paintEntry.startTime
            }
          })

          // Track all metrics
          Object.entries(metrics).forEach(([name, value]) => {
            analytics.trackPerformance(name, value, window.location.pathname)
          })
        }
      } catch (error) {
        console.error("Error tracking performance metrics:", error)
      }
    }

    // Track metrics after page load
    window.addEventListener("load", trackPerformance)

    // Clean up
    return () => {
      window.removeEventListener("load", trackPerformance)
    }
  }, [])

  // This component doesn't render anything visible
  return null
}

