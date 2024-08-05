"use client"

import { cn } from "@/shared/clsx"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import type { PropsWithChildren, ReactNode } from "react"

export interface TooltipProps extends PropsWithChildren {
  message: string | undefined | null
  alwaysOpen?: boolean
  withArrow?: boolean
  content?: ReactNode
}

export const Tooltip = ({
  message = "",
  alwaysOpen = false,
  withArrow = true,
  content,
  children,
}: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root open={alwaysOpen}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          sideOffset={4}
          className={cn(
            "radix-side-top:animate-slide-down-fade",
            "radix-side-right:animate-slide-left-fade",
            "radix-side-bottom:animate-slide-up-fade",
            "radix-side-left:animate-slide-right-fade",
            "inline-flex items-center rounded-[5px] px-4 py-2.5",
            "bg-background-secondary dark:bg-red-300",
          )}
        >
          {withArrow && (
            <TooltipPrimitive.Arrow className="fill-current text-gray" />
          )}
          {message && (
            <span className="block text-subtitle leading-none text-gray dark:text-blue-300">
              {message}
            </span>
          )}
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
