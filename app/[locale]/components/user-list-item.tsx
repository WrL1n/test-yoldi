import { Avatar } from "@/components/ui/avatar"
import type { ProfileDto } from "@/shared/__generated__/yoldi-api"
import { memo } from "react"

const getInitials = (name: string, limit = 2): string => {
  if (typeof name !== "string" || !name) return ""

  let initials = ""
  let wordCount = 0
  let prevChar = " "

  for (let i = 0; i < name.length && wordCount < limit; i++) {
    const char = name[i]
    if (prevChar === " " && char !== " ") {
      initials += char.toUpperCase()
      wordCount++
    }
    prevChar = char
  }

  return initials
}

export const UserListItem = memo(({ user }: { user: ProfileDto }) => {
  const initials = getInitials(user.name)

  return (
    <li className="flex items-center gap-5 w-full cursor-pointer hover:bg-gray/10 rounded-[5px] border-t py-2.5 border-strokes-secondary">
      <Avatar alt="" initials={initials} src={user?.image?.url} />
      <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-[1fr_auto] gap-x-5 gap-y-1 w-full truncate">
        <div className="w-full text-button-text truncate">{user.name}</div>
        <div className="text-gray text-paragraph text-left md:text-right truncate">
          {user.email}
        </div>
      </div>
    </li>
  )
})
