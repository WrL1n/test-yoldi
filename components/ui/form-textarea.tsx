import clsx from "clsx"
import {
  type ForwardedRef,
  type ReactNode,
  type TextareaHTMLAttributes,
  forwardRef,
} from "react"

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
}

export const Textarea = forwardRef(
  (
    { className, hasError, ...props }: TextareaProps,
    ref?: ForwardedRef<HTMLTextAreaElement | null>,
  ) => (
    <textarea
      ref={ref}
      className={clsx(
        "max-h-[200px] min-h-12 placeholder:text-paragraph placeholder:text-gray rounded-[5px] text-paragraph border-strokes focus:border-gray block w-full cursor-pointer appearance-none bg-transparent px-5 py-3 transition-colors focus:outline-none focus:ring-0 sm:text-sm",
        {
          "border-red-500 focus:border-red-500": hasError,
        },
        className,
      )}
      {...props}
    />
  ),
)

export interface FormTextareaProps {
  label: string
  invisibleLabel?: boolean
  placeholder?: string
  textareaProps: TextareaProps
  errorText?: string | ReactNode
  helperText?: string
}

export const FormTextarea = ({
  label,
  invisibleLabel = false,
  placeholder,
  textareaProps,
  errorText = "",
  helperText = "",
}: FormTextareaProps) => {
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
      <Textarea
        placeholder={placeholder}
        {...textareaProps}
        hasError={Boolean(errorText)}
      />

      <div
        className={clsx("absolute -bottom-4.5 text-sm", {
          "text-gray": helperText && !errorText,
          "text-red-500": errorText,
          "h-0 invisible": !subText,
          visible: subText,
        })}
        id={`${textareaProps.name}-error`}
      >
        {subText}
      </div>
    </label>
  )
}
