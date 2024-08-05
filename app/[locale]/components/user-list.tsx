"use client"

import { useEntitiesContext } from "@/components/contexts/entities-context"
import { ScrollToTop, Spinner } from "@/components/ui"
import { useScopedI18n } from "@/shared/i18n/client"
import { type Ref, forwardRef } from "react"
import { Virtuoso } from "react-virtuoso"
import { UserListItem } from "./user-list-item"
import { UserListWrapper } from "./user-list-wrapper"

export const UserList = () => {
  const t = useScopedI18n("user-list")
  const { users, usersLoading, usersError } = useEntitiesContext()

  if (usersError) {
    return <div>{t("loading-error")}</div>
  }

  return (
    <UserListWrapper>
      <h1 className="text-title w-full mb-4">{t("title")}</h1>
      {usersLoading ? (
        <div className="m-auto">
          <Spinner />
        </div>
      ) : (
        <div className="w-full md:max-w-[800px]">
          <Virtuoso
            useWindowScroll
            totalCount={users.length}
            itemContent={(index) => <UserListItem user={users[index]} />}
            components={{
              List: forwardRef((props, ref) => (
                <ul
                  {...props}
                  ref={ref as Ref<HTMLUListElement>}
                  className="last:border-b last:border-border-strokes-secondary w-full md:max-w-[800px]"
                />
              )),
            }}
          />
        </div>
      )}
      <ScrollToTop />
    </UserListWrapper>
  )
}
