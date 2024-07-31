"use client"

import { useEntitiesContext } from "@/components/contexts/entities-context"
import { useScopedI18n } from "@/shared/i18n/client"
import { UserListItem } from "./user-list-item"
import { UserListWrapper } from "./user-list-wrapper"

export const UserList = () => {
  const t = useScopedI18n("user-list")
  const { users, isLoading, error } = useEntitiesContext()

  return (
    <UserListWrapper>
      <h1 className="text-title w-full">{t("title")}</h1>
      <ul className="last:border-b last:border-border-strokes-secondary w-full md:max-w-[800px]">
        {users?.map((user) => (
          <UserListItem key={user.slug} user={user} />
        ))}
      </ul>
    </UserListWrapper>
  )
}
