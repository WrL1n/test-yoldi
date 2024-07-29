"use client"

import i18n from "@/shared/i18n/config"
import type { PropsWithChildren } from "react"
import { I18nextProvider } from "react-i18next"
import { ApiProvider } from "../contexts/api-context"

export function Providers({ children }: PropsWithChildren) {
  return (
    <ApiProvider>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </ApiProvider>
  )
}
