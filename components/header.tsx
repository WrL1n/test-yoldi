"use client"

import { useCurrentLocale, useScopedI18n } from "@/shared/i18n/client"
import { ROUTES, createLocaleRoute } from "@/shared/routes"
import Link from "next/link"
import { Logo } from "./ui"

export function Header() {
  const t = useScopedI18n("header")

  const locale = useCurrentLocale()

  return (
    <header>
      <nav className="flex items-center justify-between border-b border-strokes-secondary px-5 py-[15px]">
        <div className="gap-4 flex items-center">
          <Link
            className="bg-logo px-2 pt-4 w-[80px] h-[50px]"
            href={createLocaleRoute(locale, ROUTES.home)}
          >
            <Logo />
          </Link>
          <div className="hidden md:block max-w-[225px]">{t("title")}</div>
        </div>
        {/* хз почему при перемещении клавиатурой эта ссылка не первая^^ */}
        <Link
          className="rounded-[5px] h-[40px] py-[7px] px-[33px] border border-strokes text-black bg-transparent shadow-sm hover:underline focus:underline"
          href={createLocaleRoute(locale, ROUTES.login)}
        >
          {t("login")}
        </Link>
      </nav>
    </header>
  )
}
