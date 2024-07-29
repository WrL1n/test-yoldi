import type { AvailableLanguage } from "@/shared/i18n/consts"
import { getStaticParams } from "@/shared/i18n/server"
import { setStaticParamsLocale } from "next-international/server"

export function generateStaticParams() {
  return getStaticParams()
}

type Props = {
  params: {
    locale: AvailableLanguage
  }
}

export default function Home({ params: { locale } }: Props) {
  setStaticParamsLocale(locale)

  return <>Hello world!</>
}
