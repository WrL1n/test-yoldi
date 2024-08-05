"use client"

import {
  type ChangeEventHandler,
  type ForwardedRef,
  type InputHTMLAttributes,
  type MouseEventHandler,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from "react"

import { useScopedI18n } from "@/shared/i18n/client"
import clsx from "clsx"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  endAdornmentOnClick?: () => void
  togglePasswordVisibility?: boolean
  hasError?: boolean
}

const EyeIcon = ({ isFocused }: { isFocused: boolean }) => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 6.25C5.98755 6.25 0.976562 11.9873 0.976562 11.9873L0.512695 12.5L0.976562 13.0127C0.976562 13.0127 5.54504 18.222 11.6211 18.7012C11.911 18.7378 12.2009 18.75 12.5 18.75C12.7991 18.75 13.089 18.7378 13.3789 18.7012C19.455 18.222 24.0234 13.0127 24.0234 13.0127L24.4873 12.5L24.0234 11.9873C24.0234 11.9873 19.0125 6.25 12.5 6.25ZM12.5 7.8125C14.2212 7.8125 15.8081 8.28247 17.1875 8.91113C17.6849 9.73511 17.9688 10.6842 17.9688 11.7188C17.9688 14.5416 15.8508 16.861 13.1104 17.1631C13.0951 17.1661 13.0768 17.16 13.0615 17.1631C12.8754 17.1722 12.6892 17.1875 12.5 17.1875C12.2925 17.1875 12.0911 17.1753 11.8896 17.1631C9.14917 16.861 7.03125 14.5416 7.03125 11.7188C7.03125 10.6995 7.30591 9.75037 7.78809 8.93555H7.76367C9.15527 8.29468 10.7605 7.8125 12.5 7.8125ZM12.5 9.375C11.2061 9.375 10.1562 10.4248 10.1562 11.7188C10.1562 13.0127 11.2061 14.0625 12.5 14.0625C13.7939 14.0625 14.8438 13.0127 14.8438 11.7188C14.8438 10.4248 13.7939 9.375 12.5 9.375ZM5.66406 10.1074C5.54199 10.6323 5.46875 11.1603 5.46875 11.7188C5.46875 13.089 5.85938 14.3707 6.54297 15.4541C4.57458 14.3158 3.2074 12.9578 2.75879 12.5C3.13416 12.1155 4.18091 11.0962 5.66406 10.1074ZM19.3359 10.1074C20.8191 11.0962 21.8658 12.1155 22.2412 12.5C21.7926 12.9578 20.4254 14.3158 18.457 15.4541C19.1406 14.3707 19.5312 13.089 19.5312 11.7188C19.5312 11.1603 19.458 10.6262 19.3359 10.1074Z"
      fill={isFocused ? "#000000" : "#838383"}
    />
  </svg>
)

export const Input = forwardRef(
  (props: Partial<InputProps>, ref?: ForwardedRef<HTMLInputElement | null>) => {
    const t = useScopedI18n("common")

    const {
      startAdornment,
      endAdornment,
      endAdornmentOnClick,
      togglePasswordVisibility,
      type: initialType,
      hasError = false,
      ...rest
    } = props

    const [inputType, setInputType] = useState(initialType || "text")
    const [isEndAdornmentFocused, setIsEndAdornmentFocused] = useState(false)
    const endAdornmentRef = useRef<HTMLDivElement>(null)

    const handleEndAdornmentClick = useCallback(() => {
      if (togglePasswordVisibility) {
        setInputType((prevType) =>
          prevType === "password" ? "text" : "password",
        )
      }
      endAdornmentOnClick?.()
    }, [togglePasswordVisibility, endAdornmentOnClick])

    const handleEndAdornmentKeyDown = (
      e: ReactKeyboardEvent<HTMLDivElement>,
    ) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        handleEndAdornmentClick()
      }
    }

    const handleEndAdornmentFocus = () => {
      setIsEndAdornmentFocused(true)
    }

    const handleEndAdornmentBlur = () => {
      setIsEndAdornmentFocused(false)
    }

    const handleClick: MouseEventHandler<HTMLInputElement> = (e) => {
      rest?.onClick?.(e)
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      rest?.onChange?.(e)
    }

    const startElement = startAdornment ? startAdornment : null
    const endElement = togglePasswordVisibility ? (
      <EyeIcon isFocused={isEndAdornmentFocused} />
    ) : (
      endAdornment
    )

    return (
      <div className="relative">
        {startElement && (
          <div className="absolute inset-y-0 left-5 -top-[3px] flex items-center">
            {startElement}
          </div>
        )}

        <input
          ref={ref}
          tabIndex={0}
          spellCheck={false}
          {...rest}
          type={inputType}
          onClick={handleClick}
          onChange={handleChange}
          className={clsx(
            "placeholder:text-paragraph placeholder:text-gray rounded-[5px] text-paragraph border-strokes focus:border-gray block h-[50px] w-full cursor-pointer appearance-none bg-transparent px-5 py-3 transition-colors focus:outline-none focus:ring-0 sm:text-sm",
            {
              "!pl-[55px]": !!startAdornment,
              "!pr-[55px]": !!endAdornment,
              "border-red-500 focus:border-red-500": hasError,
            },
            rest.className,
          )}
        />

        {endElement && (
          <div
            ref={endAdornmentRef}
            className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-4 focus:outline-none"
            onClick={handleEndAdornmentClick}
            onKeyDown={handleEndAdornmentKeyDown}
            onFocus={handleEndAdornmentFocus}
            onBlur={handleEndAdornmentBlur}
            tabIndex={0}
            role="button"
            aria-label={
              inputType === "password"
                ? t("input-show-password")
                : t("input-hide-password")
            }
          >
            {endElement}
          </div>
        )}
      </div>
    )
  },
)
