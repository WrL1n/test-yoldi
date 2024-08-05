"use client"

import {
  useProfileActionsContext,
  useProfileContext,
} from "@/components/contexts/profile-context"
import { Button, FormInput, FormTextarea } from "@/components/ui"
import { useScopedI18n } from "@/shared/i18n/client"
import { isApiError } from "@/shared/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import * as Dialog from "@radix-ui/react-dialog"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const EditProfileForm = ({ onClose }: { onClose: () => void }) => {
  const t = useScopedI18n("account")

  const schema = z.object({
    name: z.string().min(2, {
      message: t("modal.schema.name"),
    }),
    email: z.string().min(6, {
      message: t("modal.schema.email"),
    }),
    description: z.string().optional(),
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
  const { profile } = useProfileContext()
  const { updateProfile } = useProfileActionsContext()

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<FormDataWithErrors>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: profile?.name,
      email: profile?.email,
      description: profile?.description ?? "",
    },
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      await updateProfile(data)
      onClose()
    } catch (error) {
      if (isApiError(error)) {
        setError("root.backendError", {
          type: "custom",
          message: error?.error?.message || t("modal.submit.error"),
        })
      }
    } finally {
      setIsLoading(false)
    }
  }
  const backendError = errors?.root?.backendError?.message

  return (
    <form
      className="mt-[25px] flex flex-col gap-[15px] last:gap-[25px]"
      onSubmit={handleSubmit(onSubmit)}
      method="PATCH"
    >
      <FormInput
        label={t("modal.name")}
        placeholder={t("modal.name")}
        inputProps={{
          ...register("name", {
            onChange: () => {
              clearErrors(["name", "root.backendError"])
            },
          }),
        }}
        errorText={errors?.name?.message}
      />
      <FormInput
        label={t("modal.email")}
        placeholder={t("modal.email")}
        inputProps={{
          ...register("email", {
            onChange: () => {
              clearErrors(["email", "root.backendError"])
            },
          }),
          type: "email",
        }}
        errorText={errors?.email?.message}
      />
      <FormTextarea
        label={t("modal.description")}
        placeholder={t("modal.description")}
        textareaProps={{
          ...register("description", {
            onChange: () => {
              clearErrors(["description", "root.backendError"])
            },
          }),
        }}
        errorText={errors?.description?.message}
      />

      {backendError && (
        <div className={"text-red-500 text-paragraph-mini capitalize"}>
          {backendError}
        </div>
      )}
      <div className="flex items-center gap-x-2.5">
        <Dialog.Close asChild className="w-full">
          <Button type="button" isLoading={isLoading} variant="outline">
            {t("modal.submit.cancel")}
          </Button>
        </Dialog.Close>

        <Button type="submit" isLoading={isLoading} className="w-full">
          {t("modal.submit.button")}
        </Button>
      </div>
    </form>
  )
}
