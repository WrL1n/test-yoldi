"use client"

import { useAuthActionsContext } from "@/components/contexts/auth-context"
import { Button } from "@/components/ui"
import { Avatar } from "@/components/ui/avatar"
import { PenIcon } from "@/components/ui/icons"
import { ExitIcon } from "@/components/ui/icons/exit"
import { useScopedI18n } from "@/shared/i18n/client"
import { AccountBackground } from "./account-background"

export interface AccountProps {
  isEditable?: boolean
  existBg?: boolean // temp
}

export const Account = ({
  isEditable = false,
  existBg = false,
}: AccountProps) => {
  const t = useScopedI18n("account")
  const { logout } = useAuthActionsContext()
  return (
    <>
      <AccountBackground isEditable={isEditable} existBg={existBg} />
      <section className="flex flex-col w-full self-center md:max-w-[800px] h-[400px] px-5 md:px-0">
        <div className="h-[100px] bg-transparent absolute top-[150px]">
          <Avatar initials={"GG"} size="lg" src="" />
        </div>
        <div className="mt-[65px] grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-5 gap-y-2">
          <div className="flex flex-col gap-2.5 truncate">
            {/* todo add tooltip */}
            <div className="text-title truncate">Name</div>
            <div className="text-paragraph text-gray">Email</div>
          </div>
          {isEditable && (
            <Button size="extra-sm" variant="outline" className="max-w-[200px]">
              <PenIcon />
              {t("edit-button")}
            </Button>
          )}
        </div>

        <p className="mb-[60px] max-w-[600px] mt-[60px] text-paragraph text-pretty">
          Similique veniam illum cupiditate voluptatem ex officiis excepturi non
          cupiditate. Saepe ut laudantium minus vel quam ullam. Autem
          necessitatibus soluta illo modi. Repudiandae ut aspernatur
          dignissimos. Officia eum ut doloribus. Iure ratione porro minima
          possimus maxime. Nobis non reprehenderit est est ea voluptas iste. Id
          quia quisquam veritatis fuga exercitationem odit ea et est. Dolor
          repudiandae non repellendus nisi ullam facere. Pariatur dolorem a
          officia eum et unde. Et et et culpa officia odio illo quisquam aliquam
          ullam. Vitae a eum perspiciatis officiis est molestiae dolorem. Nobis
          quas facere ut corporis. Sunt et ipsum occaecati et est est et
          quisquam omnis.
        </p>

        {isEditable && (
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
