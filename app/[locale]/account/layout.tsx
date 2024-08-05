import type { AvailableLanguage } from "@/shared/i18n/consts"
import { getStaticParams } from "@/shared/i18n/server"
import { type PropsWithChildren, Suspense } from "react"
import Loading from "./loading"

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
    <div className="self-center flex flex-col w-full relative">
      <div className="bg-background-secondary w-full h-[199px] border-b border-strokes-secondary" />
      <div className="self-center flex flex-col w-full">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  )
}
