"use client"

import type { PropsWithChildren } from "react"

export const FormWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="transition-all bg-white w-full md:max-w-[400px] p-[30px] md:border md:rounded-[5px] md:border-strokes-secondary">
      {children}
    </div>
  )
}
