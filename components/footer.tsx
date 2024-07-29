"use client"

import { useCurrentLocale, useScopedI18n } from "@/shared/i18n/client"
import { createLocaleRoutes } from "@/shared/routes"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Footer() {
  const t = useScopedI18n("footer")
  const locale = useCurrentLocale()
  const path = usePathname()

  return (
    <footer className="h-[72px] border-t border-strokes-secondary px-5 grid place-items-center text-paragraph text-gray">
      {path === createLocaleRoutes(locale).register ? (
        <div className="m-auto">
          {t("got-account")}{" "}
          <Link
            href={createLocaleRoutes(locale).login}
            className="bold text-black cursor-pointer hover:underline"
          >
            {t("login")}
          </Link>
        </div>
      ) : (
        <div className="m-auto">
          {t("no-account-yet")}{" "}
          <Link
            href={createLocaleRoutes(locale).register}
            className="bold text-black cursor-pointer hover:underline"
          >
            {t("register")}
          </Link>
        </div>
      )}
    </footer>
  )
}
