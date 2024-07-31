import type { ProfileDto } from "@/shared/__generated__/yoldi-api"
import React, {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react"
import { useProtectedFetch } from "../hooks/use-protected-fetch"
import { useAuthContext } from "./auth-context"

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
  const { isAuthenticated } = useAuthContext()

  const {
    data: profile,
    error,
    isLoading,
  } = useProtectedFetch<ProfileDto>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/profile`,
  )

  const value = useMemo(
    () => ({
      profile: isAuthenticated ? profile ?? null : null,
      error: isAuthenticated ? error : null,
      isLoading: isAuthenticated ? isLoading : false,
    }),
    [profile, error, isLoading, isAuthenticated],
  )

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}
