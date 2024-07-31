import { useScopedI18n } from "@/shared/i18n/client"
import { useEffect, useState } from "react"

export const ScrollToTop = () => {
  const t = useScopedI18n("common")

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      onClick={scrollToTop}
      className="animate-bounce fixed bottom-5 right-5 bg-gray/30 text-black p-2 rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      aria-label="Scroll to top"
    >
      {t("scroll-to-top")}
    </button>
  )
}
