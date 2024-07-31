import type { ProfileDto } from "@/shared/__generated__/yoldi-api"
import React, {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react"
import { useProtectedFetch } from "../hooks/use-protected-fetch"

type ProfileContextType = {
  profile: ProfileDto | null
  error: Error | null
  isLoading: boolean
}

const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  error: null,
  isLoading: false,
})

export const useProfileContext = () => useContext(ProfileContext)

export function ProfileProvider({ children }: PropsWithChildren) {
  const {
    data: profile,
    error,
    isLoading,
  } = useProtectedFetch<ProfileDto>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/profile`,
  )

  const value = useMemo(
    () => ({
      profile: profile ?? null,
      error,
      isLoading,
    }),
    [profile, error, isLoading],
  )

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}
