import type { ProfileDto } from "@/shared/__generated__/yoldi-api"
import useSWR from "swr"

const fetcher = (
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<ProfileDto> =>
  fetch(input, init).then((res) => {
    if (!res.ok) {
      throw new Error("An error occurred while fetching the data.")
    }
    return res.json() as Promise<ProfileDto>
  })

export const useUser = (slug: ProfileDto["slug"]) => {
  const {
    data: user,
    error,
    isLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${slug}`, fetcher, {
    refreshInterval: 3000,
  })

  return { user, error, isLoading }
}
