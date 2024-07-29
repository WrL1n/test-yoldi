"use client"

import type { PropsWithChildren } from "react"

import { I18nProviderClient } from "@/shared/i18n/client"
import type { AvailableLanguage } from "@/shared/i18n/consts"
import { ApiProvider } from "../contexts/api-context"

export function Providers({
  children,
  locale,
}: PropsWithChildren<{ locale: AvailableLanguage }>) {
  return (
    <ApiProvider>
      <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
    </ApiProvider>
  )
}
