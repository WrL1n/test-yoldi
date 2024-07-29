"use client"

import { useScopedI18n } from "@/shared/i18n/client"

import { Logo } from "./ui/logo"

export function Header() {
  const t = useScopedI18n("header")

  return (
    <header className="flex items-center justify-between border-b border-strokes-secondary px-5 py-[15px]">
      <div className="gap-4 flex items-center">
        <div className="bg-logo px-2 pt-4">
          <Logo />
        </div>
        <div className="hidden md:block max-w-[225px]">{t("title")}</div>
      </div>
      <div>{t("login")}</div>
    </header>
  )
}
