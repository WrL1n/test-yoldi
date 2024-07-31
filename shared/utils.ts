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

export const getInitials = (name: string, limit = 2): string => {
  if (typeof name !== "string" || !name) return ""

  let initials = ""
  let wordCount = 0
  let prevChar = " "

  for (let i = 0; i < name.length && wordCount < limit; i++) {
    const char = name[i]
    if (prevChar === " " && char !== " ") {
      initials += char
      wordCount++
    }
    prevChar = char
  }

  return initials
}
