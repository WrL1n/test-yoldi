"use client"

import type { PropsWithChildren } from "react"

import { I18nProviderClient } from "@/shared/i18n/client"
import type { AvailableLanguage } from "@/shared/i18n/consts"
import { ApiProvider } from "../contexts/api-context"
import { AuthProvider } from "../contexts/auth-context"
import { EntitiesProvider } from "../contexts/entities-context"
import { ProfileProvider } from "../contexts/profile-context"

export function Providers({
  children,
  locale,
}: PropsWithChildren<{ locale: AvailableLanguage }>) {
  return (
    <ApiProvider>
      <EntitiesProvider>
        <I18nProviderClient locale={locale}>
          <AuthProvider locale={locale}>
            <ProfileProvider>{children}</ProfileProvider>
          </AuthProvider>
        </I18nProviderClient>
      </EntitiesProvider>
    </ApiProvider>
  )
}
