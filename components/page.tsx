import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Providers } from "@/components/providers"
import type { AvailableLanguage } from "@/shared/i18n/consts"
import type { PropsWithChildren } from "react"

type Props = {
  locale: AvailableLanguage
}

export function Page({ children, locale }: PropsWithChildren<Props>) {
  return (
    <Providers locale={locale}>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-[100dvh]">
        <Header />
        <main className="bg-transparent md:bg-background-secondary">
          {children}
        </main>
        <Footer />
      </div>
    </Providers>
  )
}
