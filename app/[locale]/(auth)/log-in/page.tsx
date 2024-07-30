import type { AvailableLanguage } from "@/shared/i18n/consts"
import { getScopedI18n, getStaticParams } from "@/shared/i18n/server"
import { setStaticParamsLocale } from "next-international/server"
import { LoginForm } from "../components/login-form"

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

  const t = await getScopedI18n("login")

  return <LoginForm />
}
