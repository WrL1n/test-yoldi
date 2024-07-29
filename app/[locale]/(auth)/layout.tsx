import type { AvailableLanguage } from "@/shared/i18n/consts"
import { getStaticParams } from "@/shared/i18n/server"
import type { PropsWithChildren } from "react"

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
      <div className="bg-white w-full max-w-[400px] border border-strokes-secondary rounded-[5px]">
        {children}
      </div>
    </div>
  )
}
