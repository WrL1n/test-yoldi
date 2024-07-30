import clsx from "clsx"
import type { ReactNode } from "react"
import { Input, type InputProps } from "./input"

export interface FormInputProps {
  label: string
  invisibleLabel?: boolean
  placeholder?: string
  inputProps: InputProps
  errorText?: string | ReactNode
  helperText?: string
}

export const FormInput = ({
  label,
  invisibleLabel = false,
  placeholder,
  inputProps,
  errorText = "",
  helperText = "",
}: FormInputProps) => {
  const subText = errorText || helperText

  return (
    <label className="space-y-1 relative">
      {label && (
        <p
          className={clsx("text-sub-heading-2 text-gray", {
            "h-0 invisible": invisibleLabel,
          })}
        >
          {label}
        </p>
      )}
      <Input
        placeholder={placeholder}
        autoComplete={"off"}
        {...inputProps}
        hasError={Boolean(errorText)}
      />

      <div
        className={clsx("absolute -bottom-4.5 text-sm", {
          "text-gray": helperText && !errorText,
          "text-red-500": errorText,
          "h-0 invisible": !subText,
          visible: subText,
        })}
        id={`${inputProps.name}-error`}
      >
        {subText}
      </div>
    </label>
  )
}
