"use client"

import { useAuthActionsContext } from "@/components/contexts/auth-context"
import { useProfileContext } from "@/components/contexts/profile-context"
import { Button } from "@/components/ui"
import { Avatar } from "@/components/ui/avatar"
import { PenIcon } from "@/components/ui/icons"
import { ExitIcon } from "@/components/ui/icons/exit"
import { useScopedI18n } from "@/shared/i18n/client"
import { useParams } from "next/navigation"
import { AccountBackground } from "./account-background"

export const Account = () => {
  const params = useParams<{ slug: string }>()
  const t = useScopedI18n("account")
  const { logout } = useAuthActionsContext()
  const { profile } = useProfileContext()

  const isCurrentUserProfilePage = params.slug === profile?.slug

  return (
    <>
      <AccountBackground isEditable={isCurrentUserProfilePage} />
      <section className="flex flex-col w-full self-center md:max-w-[800px] h-[400px] px-5 lg:px-0">
        <div className="h-[100px] bg-transparent absolute top-[150px]">
          <Avatar initials={"GG"} size="lg" src="" />
        </div>
        <div className="mt-[65px] grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-5 gap-y-2">
          <div className="flex flex-col gap-2.5 truncate">
            {/* todo add tooltip */}
            <div className="text-title truncate">Name</div>
            <div className="text-paragraph text-gray">Email</div>
          </div>
          {isCurrentUserProfilePage && (
            <Button size="extra-sm" variant="outline" className="max-w-[200px]">
              <PenIcon />
              {t("edit-button")}
            </Button>
          )}
        </div>

        <p className="mb-[60px] max-w-[600px] mt-[60px] text-paragraph text-pretty">
          {profile?.description}
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
