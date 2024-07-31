import type { ProfileDto } from "@/shared/__generated__/yoldi-api"
import React, {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react"
import useSWR from "swr"

type EntitiesContextType = {
  users: ProfileDto[]

  usersError: Error | null
  usersLoading: boolean
}

export const EntitiesContext = createContext<EntitiesContextType>({
  users: [],
  usersError: null,
  usersLoading: false,
})

export const useEntitiesContext = () => useContext(EntitiesContext)

const fetcher = (
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<ProfileDto[]> =>
  fetch(input, init).then((res) => {
    if (!res.ok) {
      throw new Error("An error occurred while fetching the data.")
    }
    return res.json() as Promise<ProfileDto[]>
  })

export function EntitiesProvider({ children }: PropsWithChildren) {
  const {
    data: usersData,
    error: usersError,
    isLoading: usersLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, fetcher)

  const value = useMemo(
    () => ({
      users: (usersData?.slice(0, 5) ?? []) as ProfileDto[],
      usersError: usersError || null,
      usersLoading,
    }),
    [usersData, usersError, usersLoading],
  )

  return (
    <EntitiesContext.Provider value={value}>
      {children}
    </EntitiesContext.Provider>
  )
}
