import type { AvailableLanguage } from "@/shared/i18n/consts"
import { getStaticParams } from "@/shared/i18n/server"
import type { PropsWithChildren } from "react"
import { FormWrapper } from "./components/form-wrapper"

type Props = PropsWithChildren<{
  params: {
    locale: AvailableLanguage
  }
}>

export function generateStaticParams() {
  return getStaticParams()
}

export default function SubLayout({ children, params: { locale } }: Props) {
  return (
    <div className="grid place-items-center h-full">
      <FormWrapper>{children}</FormWrapper>
    </div>
  )
}
