// Error codes for consistent API responses
export enum ErrorCode {
  // Authentication errors
  UNAUTHORIZED = "auth/unauthorized",
  FORBIDDEN = "auth/forbidden",
  INVALID_CREDENTIALS = "auth/invalid-credentials",
  TOKEN_EXPIRED = "auth/token-expired",

  // Resource errors
  NOT_FOUND = "resource/not-found",
  ALREADY_EXISTS = "resource/already-exists",
  INVALID_STATE = "resource/invalid-state",

  // Input validation errors
  INVALID_INPUT = "validation/invalid-input",
  MISSING_REQUIRED_FIELD = "validation/missing-required-field",
  INVALID_FORMAT = "validation/invalid-format",

  // Payment errors
  PAYMENT_FAILED = "payment/failed",
  INSUFFICIENT_FUNDS = "payment/insufficient-funds",
  PAYMENT_METHOD_INVALID = "payment/method-invalid",

  // File/storage errors
  UPLOAD_FAILED = "storage/upload-failed",
  FILE_TOO_LARGE = "storage/file-too-large",
  INVALID_FILE_TYPE = "storage/invalid-file-type",

  // System errors
  INTERNAL_ERROR = "system/internal-error",
  SERVICE_UNAVAILABLE = "system/service-unavailable",
  DATABASE_ERROR = "system/database-error",
  RATE_LIMITED = "system/rate-limited",

  // Region-specific errors
  REGION_UNAVAILABLE = "region/unavailable",
  SERVICE_UNAVAILABLE_IN_REGION = "region/service-unavailable",
}

// Standard error response interface
export interface ErrorResponse {
  code: ErrorCode
  message: string
  details?: Record<string, any>
  requestId?: string
}

// Function to create standardized error responses
export function createErrorResponse(
  code: ErrorCode,
  message: string,
  details?: Record<string, any>,
  requestId?: string,
): ErrorResponse {
  return {
    code,
    message,
    ...(details && { details }),
    ...(requestId && { requestId }),
  }
}

// Map HTTP status codes to error codes
export function getStatusCodeForError(code: ErrorCode): number {
  if (code.startsWith("auth/")) {
    return code === ErrorCode.UNAUTHORIZED ? 401 : 403
  }

  if (code === ErrorCode.NOT_FOUND) {
    return 404
  }

  if (code.startsWith("validation/")) {
    return 400
  }

  if (code.startsWith("payment/")) {
    return 402
  }

  if (code === ErrorCode.ALREADY_EXISTS) {
    return 409
  }

  if (code === ErrorCode.RATE_LIMITED) {
    return 429
  }

  if (code.startsWith("region/")) {
    return 451 // Unavailable for legal reasons
  }

  // Default to internal server error
  return 500
}

// Error logging with severity levels
export enum LogSeverity {
  DEBUG = "debug",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
  CRITICAL = "critical",
}

// Log error with appropriate severity
export async function logError(
  error: Error | ErrorResponse | string,
  severity: LogSeverity = LogSeverity.ERROR,
  context?: Record<string, any>,
): Promise<void> {
  // Format the error message
  const errorMessage = typeof error === "string" ? error : "message" in error ? error.message : error.toString()

  // Format the error code if available
  const errorCode = "code" in error ? error.code : undefined

  // Combine all context information
  const logContext = {
    ...(context || {}),
    ...(errorCode && { errorCode }),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    appVersion: process.env.APP_VERSION || "unknown",
  }

  // In production, we would send this to a logging service
  if (process.env.NODE_ENV === "production") {
    // Here you would integrate with a service like Sentry, LogRocket, etc.
    console[
      severity === LogSeverity.DEBUG
        ? "debug"
        : severity === LogSeverity.INFO
          ? "info"
          : severity === LogSeverity.WARNING
            ? "warn"
            : "error"
    ](`[${severity.toUpperCase()}] ${errorMessage}`, logContext)

    // For critical errors, you might want to alert the team
    if (severity === LogSeverity.CRITICAL) {
      // Send alert to on-call team (implementation depends on your alerting system)
    }
  } else {
    // In development, just log to console with color coding
    const colorCode =
      severity === LogSeverity.DEBUG
        ? "\x1b[34m"
        : // blue
          severity === LogSeverity.INFO
          ? "\x1b[32m"
          : // green
            severity === LogSeverity.WARNING
            ? "\x1b[33m"
            : // yellow
              severity === LogSeverity.ERROR
              ? "\x1b[31m"
              : // red
                "\x1b[35m" // magenta for critical

    console.log(`${colorCode}[${severity.toUpperCase()}]\x1b[0m ${errorMessage}`, logContext)
  }
}

// Helper to handle API errors consistently
export async function handleApiError(
  error: any,
  defaultMessage = "An unexpected error occurred",
): Promise<ErrorResponse> {
  // Determine the appropriate error code
  let errorCode = ErrorCode.INTERNAL_ERROR
  let message = defaultMessage
  let details: Record<string, any> | undefined

  if (error instanceof Error) {
    message = error.message

    // Handle specific error types
    if ("code" in error) {
      // @ts-ignore - dynamic property
      const code = error.code as string

      if (code === "ECONNREFUSED" || code === "ETIMEDOUT") {
        errorCode = ErrorCode.SERVICE_UNAVAILABLE
      } else if (code === "23505") {
        // PostgreSQL unique violation
        errorCode = ErrorCode.ALREADY_EXISTS
      } else if (code === "23503") {
        // PostgreSQL foreign key violation
        errorCode = ErrorCode.INVALID_INPUT
      }
    }

    // Capture stack trace in development
    if (process.env.NODE_ENV !== "production" && error.stack) {
      details = { stack: error.stack }
    }
  } else if (typeof error === "object" && error !== null) {
    // Handle structured errors
    if ("code" in error && typeof error.code === "string") {
      // Check if it's already one of our error codes
      const isKnownErrorCode = Object.values(ErrorCode).includes(error.code as ErrorCode)
      errorCode = isKnownErrorCode ? (error.code as ErrorCode) : ErrorCode.INTERNAL_ERROR
    }

    if ("message" in error && typeof error.message === "string") {
      message = error.message
    }

    if ("details" in error) {
      details = error.details as Record<string, any>
    }
  }

  // Generate a request ID for tracking
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`

  // Log the error
  const severity = errorCode.startsWith("system/") ? LogSeverity.ERROR : LogSeverity.WARNING
  await logError({ code: errorCode, message }, severity, { requestId, originalError: error })

  // Return standardized error response
  return createErrorResponse(errorCode, message, details, requestId)
}

