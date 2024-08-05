import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@radix-ui/themes/styles.css"
import "../../public/globals.css"
import { Page } from "@/components/page"
import { cn } from "@/shared/clsx"
import type { AvailableLanguage } from "@/shared/i18n/consts"
import { getI18n, getStaticParams } from "@/shared/i18n/server"
import type { PropsWithChildren } from "react"

const inter = Inter({ subsets: ["latin"] })

type Props = PropsWithChildren<{
  params: {
    locale: AvailableLanguage
  }
}>

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n()

  return {
    title: "Test app for Yoldi",
    description: t("meta.description"),
  }
}

export function generateStaticParams() {
  return getStaticParams()
}

export default function RootLayout({ children, params: { locale } }: Props) {
  return (
    <html lang={locale} className="h-full">
      <body className={cn("h-full bg-white text-black", inter.className)}>
        <Page locale={locale}>{children}</Page>
      </body>
    </html>
  )
}
