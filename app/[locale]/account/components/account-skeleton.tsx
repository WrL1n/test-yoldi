import { Skeleton } from "@/components/ui"
import { AccountBackgroundSkeleton } from "./account-background-skeleton"

export const AccountSkeleton = () => {
  return (
    <>
      <AccountBackgroundSkeleton />
      <section className="flex flex-col w-full self-center md:max-w-[800px] h-[400px] px-5 lg:px-0">
        <Skeleton className="size-[100px] bg-transparent absolute top-[150px]" />
        <div className="mt-[65px] grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-5 gap-y-2">
          <div className="flex flex-col gap-2.5 truncate">
            <Skeleton className="w-40" />
            <Skeleton className="w-40" />
          </div>
          <Skeleton className="w-[200px] h-9" />
        </div>

        <Skeleton className="mb-[60px] h-[200px] max-w-[600px] mt-[60px]" />
        <Skeleton className="w-[130px]" />
      </section>
    </>
  )
}
