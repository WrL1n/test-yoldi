"use client"

import { useAuthActionsContext } from "@/components/contexts/auth-context"
import { Button, FormInput } from "@/components/ui"
import { EnvelopeIcon, LockIcon, UserIcon } from "@/components/ui/icons"
import { useScopedI18n } from "@/shared/i18n/client"
import { isApiError } from "@/shared/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const RegisterForm = () => {
  const t = useScopedI18n("register")

  const { signUp } = useAuthActionsContext()

  const schema = z.object({
    name: z.string().min(2, {
      message: t("schema.name"),
    }),
    email: z.string().min(2, {
      message: t("schema.email"),
    }),
    password: z.string().min(6, {
      message: t("schema.password"),
    }),
  })

  type FormData = z.infer<typeof schema>
  type FormDataWithErrors = FormData & {
    root?: {
      backendError?: {
        type: string
        message: string
      }
    }
  }

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<FormDataWithErrors>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      await signUp(data)
    } catch (error) {
      if (isApiError(error)) {
        setError("root.backendError", {
          type: "custom",
          message: error?.error?.message || t("submit.error"),
        })
      }
    }
  }
  const backendError = errors?.root?.backendError?.message

  return (
    <form
      className="flex flex-col gap-[25px]"
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
    >
      <h1 className="text-title max-w-[68%] md:max-w-[63%]">{t("title")}</h1>
      <FormInput
        label={t("name")}
        placeholder={t("name")}
        invisibleLabel
        inputProps={{
          ...register("name", {
            onChange: () => {
              clearErrors(["name", "root.backendError"])
            },
          }),
          type: "text",
          startAdornment: <UserIcon />,
        }}
        errorText={errors?.name?.message}
      />
      <FormInput
        label={t("email")}
        placeholder={t("email")}
        invisibleLabel
        inputProps={{
          ...register("email", {
            onChange: () => {
              clearErrors(["email", "root.backendError"])
            },
          }),
          type: "email",
          startAdornment: <EnvelopeIcon />,
        }}
        errorText={errors?.email?.message}
      />
      <FormInput
        label={t("password")}
        placeholder={t("password")}
        invisibleLabel
        inputProps={{
          ...register("password", {
            onChange: () => {
              clearErrors(["password", "root.backendError"])
            },
          }),
          type: "password",
          startAdornment: <LockIcon />,
          togglePasswordVisibility: true,
        }}
        errorText={errors?.password?.message}
      />
      {backendError && (
        <div className={"text-red-500 text-paragraph-mini capitalize"}>
          {backendError}
        </div>
      )}
      <Button type="submit">{t("submit.button")}</Button>
    </form>
  )
}
