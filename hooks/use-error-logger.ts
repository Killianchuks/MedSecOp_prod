"use client"

import { useEffect } from "react"
import { LogSeverity } from "@/lib/error-handler"

// Interface for error logging options
interface ErrorLoggerOptions {
  captureGlobalErrors?: boolean
  captureRejections?: boolean
  captureConsoleErrors?: boolean
}

// Hook for client-side error logging
export function useErrorLogger(options: ErrorLoggerOptions = {}) {
  const { captureGlobalErrors = true, captureRejections = true, captureConsoleErrors = false } = options

  // Function to log errors to the server
  const logErrorToServer = async (
    message: string,
    stack?: string,
    severity: LogSeverity = LogSeverity.ERROR,
    context: Record<string, any> = {},
  ) => {
    try {
      await fetch("/api/error-logging", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          stack,
          severity,
          context,
          source: "client",
        }),
      })
    } catch (error) {
      // If logging fails, log to console as fallback
      console.error("Failed to send error to logging service:", error)
    }
  }

  useEffect(() => {
    if (!captureGlobalErrors && !captureRejections && !captureConsoleErrors) {
      return
    }

    // Store original console methods if we're capturing console errors
    const originalConsoleError = console.error

    // Handler for uncaught errors
    const errorHandler = (event: ErrorEvent) => {
      event.preventDefault()

      logErrorToServer(event.message || "Uncaught error", event.error?.stack, LogSeverity.ERROR, {
        errorType: "uncaught_error",
        fileName: event.filename,
        lineNumber: event.lineno,
        columnNumber: event.colno,
      })
    }

    // Handler for unhandled promise rejections
    const rejectionHandler = (event: PromiseRejectionEvent) => {
      event.preventDefault()

      const error = event.reason
      const message = error instanceof Error ? error.message : String(error)
      const stack = error instanceof Error ? error.stack : undefined

      logErrorToServer(message || "Unhandled promise rejection", stack, LogSeverity.ERROR, {
        errorType: "unhandled_rejection",
      })
    }

    // Override console.error to capture errors
    if (captureConsoleErrors) {
      console.error = (...args) => {
        // Call original console.error
        originalConsoleError.apply(console, args)

        // Log the error
        const message = args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg))).join(" ")

        logErrorToServer(message, undefined, LogSeverity.WARNING, { errorType: "console_error" })
      }
    }

    // Add event listeners
    if (captureGlobalErrors) {
      window.addEventListener("error", errorHandler)
    }

    if (captureRejections) {
      window.addEventListener("unhandledrejection", rejectionHandler)
    }

    // Clean up
    return () => {
      if (captureGlobalErrors) {
        window.removeEventListener("error", errorHandler)
      }

      if (captureRejections) {
        window.removeEventListener("unhandledrejection", rejectionHandler)
      }

      if (captureConsoleErrors) {
        console.error = originalConsoleError
      }
    }
  }, [captureGlobalErrors, captureRejections, captureConsoleErrors])

  // Return function to manually log errors
  return {
    logError: (error: Error | string, severity: LogSeverity = LogSeverity.ERROR, context: Record<string, any> = {}) => {
      const message = error instanceof Error ? error.message : error
      const stack = error instanceof Error ? error.stack : undefined

      return logErrorToServer(message, stack, severity, context)
    },
  }
}

