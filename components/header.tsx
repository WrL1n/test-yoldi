"use client"

import { useCurrentLocale, useScopedI18n } from "@/shared/i18n/client"
import { ROUTES, createLocaleRoute } from "@/shared/routes"
import Link from "next/link"
import { ProfileChip } from "./profile-chip"
import { Logo } from "./ui"

export function Header() {
  const t = useScopedI18n("header")
  const locale = useCurrentLocale()

  return (
    <header className="sticky top-0 bg-white">
      <nav className="flex items-center justify-between border-b border-strokes-secondary px-5 py-[15px] h-20">
        <div className="gap-5 flex items-center">
          <Link
            className="bg-logo px-2 pt-4 w-[80px] h-[50px] flex items-center justify-center"
            href={createLocaleRoute(locale, ROUTES.home)}
          >
            <Logo />
          </Link>
          <div className="hidden md:block w-[226px] text-paragraph">
            {t("title")}
          </div>
        </div>
        <ProfileChip />
      </nav>
    </header>
  )
}
