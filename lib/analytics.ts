// Analytics tracking for the MedSecOp platform
// This provides a unified interface for tracking user behavior and system events

// Event categories
export enum EventCategory {
  USER = "user",
  CASE = "case",
  PAYMENT = "payment",
  SYSTEM = "system",
  NAVIGATION = "navigation",
  ENGAGEMENT = "engagement",
  ERROR = "error",
  PERFORMANCE = "performance",
  REGION = "region",
}

// Event action types
export enum EventAction {
  // User events
  SIGN_UP = "sign_up",
  LOGIN = "login",
  LOGOUT = "logout",
  UPDATE_PROFILE = "update_profile",
  CHANGE_ROLE = "change_role",
  CHANGE_REGION = "change_region",

  // Case events
  CREATE_CASE = "create_case",
  UPDATE_CASE = "update_case",
  VIEW_CASE = "view_case",
  SUBMIT_OPINION = "submit_opinion",
  UPLOAD_DOCUMENT = "upload_document",

  // Payment events
  INITIATE_PAYMENT = "initiate_payment",
  COMPLETE_PAYMENT = "complete_payment",
  REFUND_PAYMENT = "refund_payment",

  // Navigation events
  PAGE_VIEW = "page_view",
  CLICK = "click",
  SEARCH = "search",

  // System events
  ERROR = "error",
  PERFORMANCE = "performance",
  FEATURE_USAGE = "feature_usage",

  // Engagement events
  START_SESSION = "start_session",
  END_SESSION = "end_session",
  INTERACTION = "interaction",
}

// Event properties interface
export interface EventProperties {
  [key: string]: string | number | boolean | null | undefined
}

// User properties interface
export interface UserProperties {
  userId?: string
  role?: string
  region?: string
  isAuthenticated?: boolean
  [key: string]: string | number | boolean | null | undefined
}

// Analytics event interface
export interface AnalyticsEvent {
  category: EventCategory
  action: EventAction
  label?: string
  value?: number
  properties?: EventProperties
  timestamp: number
}

// Class to manage analytics tracking
export class Analytics {
  private static instance: Analytics
  private userProperties: UserProperties = {}
  private enabled = true
  private queue: AnalyticsEvent[] = []
  private flushInterval: NodeJS.Timeout | null = null

  private constructor() {
    // Initialize flush interval in client-side environments
    if (typeof window !== "undefined") {
      this.flushInterval = setInterval(() => this.flush(), 10000) // Flush every 10 seconds
    }
  }

  // Get singleton instance
  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics()
    }
    return Analytics.instance
  }

  // Set user properties
  public setUser(properties: UserProperties): void {
    this.userProperties = {
      ...this.userProperties,
      ...properties,
    }
  }

  // Clear user properties (e.g., on logout)
  public clearUser(): void {
    this.userProperties = {}
  }

  // Enable or disable analytics tracking
  public setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }

  // Track an event
  public track(
    category: EventCategory,
    action: EventAction,
    label?: string,
    value?: number,
    properties?: EventProperties,
  ): void {
    if (!this.enabled) return

    const event: AnalyticsEvent = {
      category,
      action,
      label,
      value,
      properties: {
        ...properties,
        region: this.userProperties.region,
        userRole: this.userProperties.role,
      },
      timestamp: Date.now(),
    }

    this.queue.push(event)

    // If queue gets too large, flush immediately
    if (this.queue.length >= 20) {
      this.flush()
    }
  }

  // Track page view
  public trackPageView(path: string, title?: string): void {
    this.track(EventCategory.NAVIGATION, EventAction.PAGE_VIEW, title, undefined, { path })
  }

  // Track user interaction
  public trackInteraction(element: string, detail?: string): void {
    this.track(EventCategory.ENGAGEMENT, EventAction.INTERACTION, element, undefined, { detail })
  }

  // Track error
  public trackError(errorCode: string, errorMessage: string, fatal = false): void {
    this.track(EventCategory.ERROR, EventAction.ERROR, errorCode, undefined, {
      errorMessage,
      fatal,
    })
  }

  // Track performance
  public trackPerformance(metric: string, value: number, context?: string): void {
    this.track(EventCategory.PERFORMANCE, EventAction.PERFORMANCE, metric, value, { context })
  }

  // Flush events to analytics service
  private async flush(): Promise<void> {
    if (this.queue.length === 0) return

    const events = [...this.queue]
    this.queue = []

    try {
      // In a real implementation, you would send these events to your analytics service
      if (process.env.NODE_ENV === "production") {
        // Send to analytics service
        await this.sendToAnalyticsService(events)
      } else {
        // In development, just log to console
        console.log("Analytics events:", events)
      }
    } catch (error) {
      // If sending fails, add back to queue for retry
      console.error("Failed to send analytics events:", error)
      this.queue = [...events, ...this.queue]
    }
  }

  // Send events to analytics service
  private async sendToAnalyticsService(events: AnalyticsEvent[]): Promise<void> {
    // This would be implemented with your specific analytics provider
    // Example with a generic API endpoint:
    try {
      const response = await fetch("/api/analytics/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          events,
          user: this.userProperties,
        }),
      })

      if (!response.ok) {
        throw new Error(`Analytics API responded with status: ${response.status}`)
      }
    } catch (error) {
      console.error("Analytics service error:", error)
      throw error
    }
  }

  // Clean up resources
  public dispose(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval)
      this.flushInterval = null
    }

    // Flush any remaining events
    this.flush()
  }
}

// Export singleton instance
export const analytics = Analytics.getInstance()

// React hook for tracking page views
export function usePageViewTracking(path: string, title?: string): void {
  if (typeof window !== "undefined") {
    // Track page view when component mounts
    analytics.trackPageView(path, title)
  }
}

