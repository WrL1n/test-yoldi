import type { AvailableLanguage } from "@/shared/i18n/consts"
import { getStaticParams } from "@/shared/i18n/server"
import { setStaticParamsLocale } from "next-international/server"
import { UserList } from "./components/user-list"

export function generateStaticParams() {
  return getStaticParams()
}

type Props = {
  params: {
    locale: AvailableLanguage
  }
}

export default async function Home({ params: { locale } }: Props) {
  setStaticParamsLocale(locale)

  return <UserList />
}
