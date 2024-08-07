"use client"

import { useCurrentLocale, useScopedI18n } from "@/shared/i18n/client"
import { ROUTES, createLocaleRoute } from "@/shared/routes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuthContext } from "./contexts/auth-context"

export function Footer() {
  const t = useScopedI18n("footer")
  const locale = useCurrentLocale()
  const path = usePathname()
  const { isAuthenticated } = useAuthContext()

  return (
    <>
      {!isAuthenticated ? (
        <footer className="sticky bottom-0 bg-white h-[72px] border-t border-strokes-secondary px-5 grid place-items-center text-paragraph text-gray">
          {path === createLocaleRoute(locale, ROUTES.register) ? (
            <div className="m-auto">
              {t("got-account")}{" "}
              <Link
                href={createLocaleRoute(locale, ROUTES.login)}
                className="bold text-black cursor-pointer hover:underline"
              >
                {t("login")}
              </Link>
            </div>
          ) : (
            <div className="m-auto">
              {t("no-account-yet")}{" "}
              <Link
                href={createLocaleRoute(locale, ROUTES.register)}
                className="bold text-black cursor-pointer hover:underline"
              >
                {t("register")}
              </Link>
            </div>
          )}
        </footer>
      ) : null}
    </>
  )
}
