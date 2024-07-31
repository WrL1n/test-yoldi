"use client"

import { useCurrentLocale, useScopedI18n } from "@/shared/i18n/client"
import { ROUTES, createLocaleRoute } from "@/shared/routes"
import { getInitials } from "@/shared/utils"
import Link from "next/link"
import { useProfileContext } from "./contexts/profile-context"
import { Logo } from "./ui"
import { Avatar } from "./ui/avatar"

export function Header() {
  const { profile } = useProfileContext()

  const t = useScopedI18n("header")
  const locale = useCurrentLocale()

  const initials = getInitials(profile?.name ?? "")

  return (
    <header className="sticky top-0 bg-white">
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
        {profile ? (
          <div className="flex items-center  gap-x-5 min-w-[155px] max-w-[200px]">
            <div className="text-paragraph text-right truncate">
              {profile.name}
            </div>
            <Avatar src={profile.image?.url} initials={initials} />
          </div>
        ) : (
          <Link
            className="rounded-[5px] h-[40px] py-[7px] px-[33px] border border-strokes text-black bg-transparent shadow-sm hover:underline focus:underline"
            href={createLocaleRoute(locale, ROUTES.login)}
          >
            {t("login")}
          </Link>
        )}
      </nav>
    </header>
  )
}
