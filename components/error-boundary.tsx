"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangleIcon, RefreshCwIcon, HomeIcon } from "lucide-react"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo)

    // You could also log to your analytics or error tracking service here
    if (typeof window !== "undefined") {
      // Example of sending to an error tracking service
      // errorTrackingService.captureException(error, { extra: errorInfo })
    }

    this.setState({ errorInfo })
  }

  handleReload = (): void => {
    window.location.reload()
  }

  handleGoHome = (): void => {
    window.location.href = "/"
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangleIcon className="h-5 w-5 text-red-500" />
                  <CardTitle>Something went wrong</CardTitle>
                </div>
                <CardDescription>We apologize for the inconvenience. An unexpected error has occurred.</CardDescription>
              </CardHeader>
              <CardContent>
                {process.env.NODE_ENV !== "production" && this.state.error && (
                  <div className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
                    <p className="font-bold text-red-500">{this.state.error.toString()}</p>
                    {this.state.errorInfo && (
                      <pre className="mt-2 text-xs text-gray-700">{this.state.errorInfo.componentStack}</pre>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={this.handleGoHome}>
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
                <Button onClick={this.handleReload}>
                  <RefreshCwIcon className="mr-2 h-4 w-4" />
                  Reload Page
                </Button>
              </CardFooter>
            </Card>
          </div>
        )
      )
    }

    return this.props.children
  }
}

