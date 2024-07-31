import { cn } from "@/shared/clsx"
import * as RadixAvatar from "@radix-ui/react-avatar"
import { type VariantProps, cva } from "class-variance-authority"
import { memo, useRef, useState } from "react"
import { CameraIcon } from "./icons"

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  initials: string
  src?: string
  alt?: string
  className?: string
  onImageSelect?: (file: File) => void
  isEditable?: boolean
}

export const avatarVariants = cva(
  "uppercase m-auto bg-background-secondary rounded-full border border-strokes-secondary flex h-full w-full items-center justify-center transition-colors duration-200",
  {
    variants: {
      size: {
        default: "size-[50px] text-subtitle",
        lg: "size-[100px] text-title-super",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

export const Avatar = memo(
  ({
    size,
    src,
    className,
    initials,
    onImageSelect,
    isEditable = false,
  }: AvatarProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
      if (isEditable) {
        fileInputRef.current?.click()
      }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file && onImageSelect) {
        onImageSelect(file)
      }
    }

    const handleMouseEnter = () => {
      if (isEditable) {
        setIsHovered(true)
      }
    }

    const handleMouseLeave = () => {
      if (isEditable) {
        setIsHovered(false)
      }
    }

    return (
      <RadixAvatar.Root
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={cn(
          "shrink-0 bg-background-secondary border border-strokes-secondary inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle",
          isEditable && "cursor-pointer",
          avatarVariants({ size, className }),
        )}
      >
        <RadixAvatar.Image
          className={cn("w-full h-full object-cover", avatarVariants({ size }))}
          src={src}
          alt=""
        />
        <RadixAvatar.Fallback
          className={cn(
            "w-full h-full flex items-center justify-center",
            avatarVariants({ size }),
          )}
          delayMs={50}
        >
          {initials}
        </RadixAvatar.Fallback>

        {isEditable && isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <CameraIcon className="text-white shrink-0 size-[50px]" />
          </div>
        )}

        {isEditable && (
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        )}
      </RadixAvatar.Root>
    )
  },
)
