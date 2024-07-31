import { getInitials } from "@/shared/utils"

import { useCurrentLocale, useScopedI18n } from "@/shared/i18n/client"
import { ROUTES, createLocaleRoute } from "@/shared/routes"
import Link from "next/link"
import { useProfileContext } from "./contexts/profile-context"
import { Avatar } from "./ui/avatar"

export const ProfileChip = () => {
  const { profile } = useProfileContext()
  const t = useScopedI18n("header")
  const locale = useCurrentLocale()
  const initials = getInitials(profile?.name ?? "")

  return (
    <>
      {profile ? (
        <Link
          href={createLocaleRoute(locale, ROUTES.account)}
          className="flex items-center min-w-[155px] max-w-[200px] focus:shadow-sm hover:shadow-sm rounded-[5px]"
        >
          <div className="pl-5 text-paragraph text-right truncate">
            {profile.name}
          </div>
          <Avatar src={profile.image?.url} initials={initials} />
        </Link>
      ) : (
        <Link
          className="rounded-[5px] h-[40px] py-[7px] px-[33px] border border-strokes text-black bg-transparent shadow-sm hover:underline focus:underline"
          href={createLocaleRoute(locale, ROUTES.login)}
        >
          {t("login")}
        </Link>
      )}
    </>
  )
}
