export const AVAILABLE_LANGUAGES = ["ru", "en"] as const
export type AvailableLanguage = (typeof AVAILABLE_LANGUAGES)[number]
