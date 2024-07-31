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
  error: null
  isLoading: boolean
}

export const EntitiesContext = createContext<EntitiesContextType>({
  users: [],
  error: null,
  isLoading: false,
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
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
    fetcher,
  )

  const value = useMemo(
    () => ({
      users: (data ?? []) as ProfileDto[],
      error,
      isLoading,
    }),
    [data, error, isLoading],
  )

  return (
    <EntitiesContext.Provider value={value}>
      {children}
    </EntitiesContext.Provider>
  )
}
