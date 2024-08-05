import { Skeleton } from "@/components/ui/skeleton"

export const AccountBackgroundSkeleton = () => {
  return (
    <section className="absolute top-0 w-full h-[200px] grid place-content-center bg-background-secondary">
      <Skeleton className="w-32 h-10 rounded-[5px]" />
    </section>
  )
}
