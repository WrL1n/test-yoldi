import { initReactI18next } from "react-i18next"

import "i18next"

import i18n from "i18next"

import ru from "./locales/ru.json"

export const AVAILABLE_LANGUAGES = ["ru"]

export const resources = {
  ru,
} as const

i18n.use(initReactI18next).init({
  lng: "ru",
  fallbackLng: "ru",
  supportedLngs: AVAILABLE_LANGUAGES,
  ns: Object.keys(resources.ru),
  resources,
  returnNull: false,
})

export default i18n
