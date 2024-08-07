import { Avatar } from "@/components/ui/avatar"
import type { ProfileDto } from "@/shared/__generated__/yoldi-api"
import { useCurrentLocale } from "@/shared/i18n/client"
import { ROUTES } from "@/shared/routes"
import { getInitials } from "@/shared/utils"
import Link from "next/link"
import { memo } from "react"

export const UserListItem = memo(({ user }: { user: ProfileDto }) => {
  const initials = getInitials(user.name)
  const locale = useCurrentLocale()

  return (
    <li>
      <Link
        href={`/${locale}/${ROUTES.account}/${user.slug}`}
        className="flex items-center gap-5 w-full cursor-pointer hover:bg-gray/10 rounded-[5px] border-t py-2.5 border-strokes-secondary"
      >
        <Avatar alt="" initials={initials} src={user?.image?.url} />
        <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-[1fr_auto] gap-x-5 gap-y-1 w-full truncate">
          <div className="w-full text-button-text truncate">{user.name}</div>
          <div className="text-gray text-paragraph text-left md:text-right truncate">
            {user.email}
          </div>
        </div>
      </Link>
    </li>
  )
})
