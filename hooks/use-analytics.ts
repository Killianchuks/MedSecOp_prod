"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { analytics, EventCategory, EventAction } from "@/lib/analytics"
import { useRegion } from "@/contexts/region-context"

// Hook to track page views
export function usePageViewTracking() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { currentRegion } = useRegion()

  useEffect(() => {
    // Set region in analytics
    analytics.setUser({
      region: currentRegion.code,
    })

    // Track page view
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
    analytics.trackPageView(url, document.title)

    // Track performance metrics
    if (typeof window !== "undefined" && "performance" in window) {
      // Use setTimeout to ensure metrics are collected after page load
      setTimeout(() => {
        const perfEntries = performance.getEntriesByType("navigation")
        if (perfEntries.length > 0) {
          const navigationEntry = perfEntries[0] as PerformanceNavigationTiming

          // Track page load time
          analytics.trackPerformance(
            "page_load_time",
            navigationEntry.loadEventEnd - navigationEntry.startTime,
            pathname,
          )

          // Track time to first byte
          analytics.trackPerformance("ttfb", navigationEntry.responseStart - navigationEntry.requestStart, pathname)

          // Track DOM content loaded
          analytics.trackPerformance(
            "dom_content_loaded",
            navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime,
            pathname,
          )
        }
      }, 0)
    }

    // Clean up function
    return () => {
      // Track page exit time
      const timeOnPage = Date.now() - performance.now()
      analytics.track(
        EventCategory.ENGAGEMENT,
        EventAction.END_SESSION,
        pathname,
        Math.floor(timeOnPage / 1000), // Convert to seconds
        { path: pathname },
      )
    }
  }, [pathname, searchParams, currentRegion.code])
}

// Hook to track user interactions
export function useInteractionTracking() {
  return {
    trackClick: (element: string, detail?: string) => {
      analytics.trackInteraction(element, detail)
    },
    trackError: (errorCode: string, errorMessage: string, fatal = false) => {
      analytics.trackError(errorCode, errorMessage, fatal)
    },
    trackEvent: (
      category: EventCategory,
      action: EventAction,
      label?: string,
      value?: number,
      properties?: Record<string, any>,
    ) => {
      analytics.track(category, action, label, value, properties)
    },
  }
}

// Hook to set user properties in analytics
export function useAnalyticsUser(userId?: string, role?: string) {
  useEffect(() => {
    if (userId) {
      analytics.setUser({
        userId,
        role,
      })
    } else {
      analytics.clearUser()
    }

    return () => {
      // Clear user on unmount
      analytics.clearUser()
    }
  }, [userId, role])
}

