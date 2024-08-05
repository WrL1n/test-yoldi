import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/shared/clsx"
import { Spinner } from "."

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-x-2.5 whitespace-nowrap rounded-[5px] text-text-button transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-strokes",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white shadow hover:bg-black/80 focus:bg-black/80",
        outline:
          "border border-strokes text-black bg-transparent shadow-sm hover:underline focus:underline",
      },
      size: {
        default: "h-[50px] py-3 px-[33px]",
        sm: "h-[40px] py-[7px] px-[33px]",
        "extra-sm": "h-[40px] py-[7px] px-[22px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? <Spinner className="size-4" /> : children}
      </Comp>
    )
  },
)
