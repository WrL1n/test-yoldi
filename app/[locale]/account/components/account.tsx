"use client"

import { Button } from "@/components/ui"
import { Avatar } from "@/components/ui/avatar"
import { PenIcon } from "@/components/ui/icons"
import { cn } from "@/shared/clsx"
import { useScopedI18n } from "@/shared/i18n/client"
import { useState } from "react"
import { AccountBackground } from "./account-background"

export interface AccountProps {
  isEditable?: boolean
  existBg?: boolean // temp
}

export const Account = ({
  isEditable = true,
  existBg = false,
}: AccountProps) => {
  const t = useScopedI18n("account")

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
          <Button size="extra-sm" variant="outline" className="max-w-[200px]">
            <PenIcon />
            {t("edit-button")}
          </Button>
        </div>
      </section>
    </>
  )
}
