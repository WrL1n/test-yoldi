import useSWR from "swr"
import { useAuthActionsContext } from "../contexts/auth-context"

export const useProtectedFetch = <T>(url: string) => {
  const { getToken } = useAuthActionsContext()

  const fetcher = async (url: string) => {
    const token = await getToken()
    if (!token) {
      throw new Error("No token available")
    }

    const response = await fetch(url, {
      headers: {
        // Authorization: `Bearer ${token}`,
        "x-api-key": token,
      },
    })

    if (!response.ok) {
      throw new Error("An error occurred while fetching the data.")
    }

    return response.json()
  }

  return useSWR<T>(url, fetcher)
}
