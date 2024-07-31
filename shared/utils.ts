export interface ApiError {
  error: {
    message: string
    code?: string
  }
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "error" in error &&
    typeof (error as any).error === "object" &&
    "message" in (error as any).error
  )
}
