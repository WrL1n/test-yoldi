import type { ProfileDto } from "@/shared/__generated__/yoldi-api"
import React, {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react"
import { useProtectedFetch } from "../hooks/use-protected-fetch"
import { useAuthActionsContext, useAuthContext } from "./auth-context"

type ProfileContextType = {
  profile: ProfileDto | null
  error: Error | null
  isLoading: boolean
}

type ProfileActionsContextType = {
  updateProfile: (updatedProfile: Partial<ProfileDto>) => Promise<ProfileDto>
}

const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  error: null,
  isLoading: false,
})

const ProfileActionsContext = createContext<ProfileActionsContextType>({
  updateProfile: async () => {
    throw new Error("updateProfile function not implemented")
  },
})

export const useProfileContext = () => useContext(ProfileContext)
export const useProfileActionsContext = () => useContext(ProfileActionsContext)

const PROFILE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/profile`

export function ProfileProvider({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuthContext()
  const { getToken } = useAuthActionsContext()

  const {
    data: profile,
    error,
    isLoading,
    mutate,
  } = useProtectedFetch<ProfileDto>(PROFILE_URL)

  const updateProfile = async (
    updatedProfileData: Partial<ProfileDto>,
  ): Promise<ProfileDto> => {
    if (!isAuthenticated) {
      throw new Error("User is not authenticated")
    }

    const token = await getToken()
    if (!token) {
      throw new Error("No token available")
    }

    const updatedProfile = { ...profile, ...updatedProfileData }

    const response = await fetch(PROFILE_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": token,
      },
      body: JSON.stringify(updatedProfile),
    })

    if (!response.ok) {
      throw new Error("Failed to update profile")
    }

    const updatedData: ProfileDto = await response.json()
    mutate(updatedData)
    return updatedData
  }

  const profileValue = useMemo(
    () => ({
      profile: isAuthenticated ? profile ?? null : null,
      error: isAuthenticated ? error : null,
      isLoading: isAuthenticated ? isLoading : false,
    }),
    [profile, error, isLoading, isAuthenticated],
  )

  const actionsValue = useMemo(
    () => ({
      updateProfile,
    }),
    [updateProfile],
  )

  return (
    <ProfileContext.Provider value={profileValue}>
      <ProfileActionsContext.Provider value={actionsValue}>
        {children}
      </ProfileActionsContext.Provider>
    </ProfileContext.Provider>
  )
}
