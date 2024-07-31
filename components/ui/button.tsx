import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/shared/clsx"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-x-2.5 whitespace-nowrap rounded-[5px] text-text-button transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-strokes",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white shadow hover:bg-black/80 focus:bg-black/80",
        // destructive:
        //   "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-strokes text-black bg-transparent shadow-sm hover:underline focus:underline",
        // secondary:
        //   "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        // ghost: "hover:bg-accent hover:text-accent-foreground",
        // link: "text-black underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[50px] py-3 px-[33px]",
        sm: "h-[40px] py-[7px] px-[33px]",
        "extra-sm": "h-[40px] py-[7px] px-[22px]",
        // lg: "h-10 rounded-md px-8",
        // icon: "h-9 w-9",
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
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
