import type { AvailableLanguage } from "@/shared/i18n/consts"
import { getStaticParams } from "@/shared/i18n/server"
import { setStaticParamsLocale } from "next-international/server"
import { Account } from "./components/account"

export function generateStaticParams() {
  return getStaticParams()
}

type Props = {
  params: {
    locale: AvailableLanguage
  }
}

export default async function Page({ params: { locale } }: Props) {
  setStaticParamsLocale(locale)

  return <Account />
}
