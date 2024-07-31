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

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function EntitiesProvider({ children }: PropsWithChildren) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
    fetcher,
  )

  const value = useMemo(
    () => ({
      users: data,
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
