import { cn } from "@/shared/clsx"

export const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "animate-pulse min-h-9 rounded-[5px] bg-gray/10",
        className,
      )}
      {...props}
    />
  )
}
