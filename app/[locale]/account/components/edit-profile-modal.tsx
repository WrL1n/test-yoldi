import { useScopedI18n } from "@/shared/i18n/client"
import * as Dialog from "@radix-ui/react-dialog"
import React, { useState, type PropsWithChildren } from "react"
import { EditProfileForm } from "./edit-profile-form"

export const EditProfileModal = ({ children }: PropsWithChildren) => {
  const t = useScopedI18n("account")
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => setIsOpen(false)

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] max-w-[90vw] w-[90vw] md:max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[5px] bg-white p-[30px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="flex items-center text-title">
            {t("modal.title")}
          </Dialog.Title>
          <Dialog.Description className="hidden">
            {t("modal.subtitle")}
          </Dialog.Description>
          <EditProfileForm onClose={handleClose} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
