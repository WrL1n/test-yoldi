import { Button } from "@/components/ui"
import { ImageIcon, TrashIcon, UploadIcon } from "@/components/ui/icons"
import { cn } from "@/shared/clsx"
import { useScopedI18n } from "@/shared/i18n/client"
import { useEffect, useState } from "react"

interface AccountBackgroundProps {
  isEditable?: boolean
  backgroundUrl: string | undefined
}

const TIMEOUT_TO_DISABLE_BG_BUTTON_ON_MOBILES = 4000

export const AccountBackground = ({
  isEditable,
  backgroundUrl,
}: AccountBackgroundProps) => {
  const existBg = !!backgroundUrl

  const t = useScopedI18n("account")
  const [isBgHovered, setIsBgHovered] = useState(false)

  const handleOnMouseEnter = () => {
    if (isEditable) setIsBgHovered(true)
  }
  const handleOnMouseLeave = () => {
    if (isEditable) setIsBgHovered(false)
  }

  const handleOnTouchStart = () => {
    if (isEditable) {
      setIsBgHovered(true)
      const timer = setTimeout(
        () => setIsBgHovered(false),
        TIMEOUT_TO_DISABLE_BG_BUTTON_ON_MOBILES,
      )
      return () => clearTimeout(timer)
    }
  }

  useEffect(() => {
    if (backgroundUrl) {
      document.documentElement.style.setProperty(
        "--background-image",
        `url(${backgroundUrl})`,
      )
    } else {
      document.documentElement.style.setProperty("--background-image", "none")
    }
  }, [backgroundUrl])

  const backgroundClass = backgroundUrl ? "bg-custom" : "bg-none"

  return (
    <section
      className={cn(
        "absolute top-0 w-full h-[200px] grid place-content-center bg-cover bg-center",
        { "cursor-pointer": isEditable },
        backgroundClass,
      )}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onTouchStart={handleOnTouchStart}
      aria-label={
        !isEditable
          ? ""
          : existBg
            ? t("remove-bg-image-desc")
            : t("set-bg-image-desc")
      }
    >
      {isEditable && (
        <Button
          className={cn("focus:opacity-100 transition-opacity duration-300", {
            "opacity-100": isBgHovered,
            "opacity-0": !isBgHovered,
          })}
          variant={"outline"}
          size={"extra-sm"}
          type="button"
        >
          {existBg ? (
            <>
              <TrashIcon />
              {t("remove-bg-image-button")}
            </>
          ) : (
            <>
              <UploadIcon />
              {t("set-bg-image-button")}
            </>
          )}
          <ImageIcon />
        </Button>
      )}
    </section>
  )
}
