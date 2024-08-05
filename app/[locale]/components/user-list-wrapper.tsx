import type { PropsWithChildren } from "react"

export const UserListWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="m-auto self-center flex flex-col gap-y-[30px] px-5 py-[50px] w-full max-w-full md:max-w-[800px]">
      {children}
    </div>
  )
}
