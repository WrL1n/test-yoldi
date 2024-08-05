"use client"

import { useAuthActionsContext } from "@/components/contexts/auth-context"
import { useProfileContext } from "@/components/contexts/profile-context"
import { useBreakpoint } from "@/components/hooks/use-breakpoint"
import { useUser } from "@/components/hooks/use-user"
import { Button, Tooltip } from "@/components/ui"
import { Avatar } from "@/components/ui/avatar"
import { PenIcon } from "@/components/ui/icons"
import { ExitIcon } from "@/components/ui/icons/exit"
import { useScopedI18n } from "@/shared/i18n/client"
import { getInitials } from "@/shared/utils"
import { useParams } from "next/navigation"
import { useCallback, useState } from "react"
import { AccountBackground } from "./account-background"
import { AccountSkeleton } from "./account-skeleton"

const TOOLTIP_DURATION = 2000

export const Account = () => {
  const t = useScopedI18n("account")

  const { slug } = useParams<{ slug: string }>()
  const { user, isLoading } = useUser(slug)
  const { isAboveMd } = useBreakpoint("md")

  const { logout } = useAuthActionsContext()
  const { profile } = useProfileContext()

  const [isNameClicked, setIsNameClicked] = useState<boolean>(false)
  const [isEmailClicked, setIsEmailClicked] = useState<boolean>(false)

  const isCurrentUserProfilePage = slug === profile?.slug
  const initials = getInitials(
    isCurrentUserProfilePage ? profile.name : user?.name ?? "",
  )

  const onTouchName = useCallback(() => {
    if (isAboveMd) return null
    setIsNameClicked(true)
    setTimeout(() => {
      setIsNameClicked(false)
    }, TOOLTIP_DURATION)
  }, [isAboveMd])

  const onTouchEmail = useCallback(() => {
    if (isAboveMd) return null
    setIsEmailClicked(true)
    setTimeout(() => {
      setIsEmailClicked(false)
    }, TOOLTIP_DURATION)
  }, [isAboveMd])

  if (isLoading) return <AccountSkeleton />

  return (
    <>
      <AccountBackground
        isEditable={isCurrentUserProfilePage}
        backgroundUrl={user?.cover?.url}
      />
      <section className="flex flex-col w-full self-center md:max-w-[800px] h-[400px] px-5 lg:px-0">
        <div className="h-[100px] bg-transparent absolute top-[150px]">
          <Avatar
            initials={initials}
            size="lg"
            src={user?.image?.url}
            isEditable={isCurrentUserProfilePage}
          />
        </div>
        <div className="mt-[65px] grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-5 gap-y-2">
          <div className="flex flex-col gap-2.5 truncate">
            <Tooltip alwaysOpen={isNameClicked} message={user?.name}>
              <div
                className="w-fit text-title truncate"
                onTouchStart={onTouchName}
              >
                {user?.name}
              </div>
            </Tooltip>
            <Tooltip alwaysOpen={isEmailClicked} message={user?.email}>
              <div
                className="w-fit text-paragraph text-gray"
                onTouchStart={onTouchEmail}
              >
                {user?.email}
              </div>
            </Tooltip>
          </div>
          {isCurrentUserProfilePage && (
            <Button size="extra-sm" variant="outline" className="max-w-[200px]">
              <PenIcon />
              {t("edit-button")}
            </Button>
          )}
        </div>

        <p className="mb-[60px] max-w-[600px] mt-[60px] text-paragraph text-pretty">
          {user?.description}
        </p>
        {isCurrentUserProfilePage && (
          <Button
            size="extra-sm"
            variant="outline"
            className="max-w-[130px]"
            onClick={logout}
          >
            <ExitIcon />
            {t("logout")}
          </Button>
        )}
      </section>
    </>
  )
}
