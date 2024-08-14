import { Api, HttpClient } from "@/shared/__generated__/yoldi-api"
import type React from "react"
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react"

interface ApiContextType {
  api: React.MutableRefObject<Api<unknown>> | null
  // updateAuthHeader: (token: string) => void;
  httpClient: HttpClient<unknown>
}

export const ApiContext = createContext<ApiContextType>({
  api: null,
  // updateAuthHeader: () => {},
  httpClient: new HttpClient({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
})

export const useApiContext = () => useContext(ApiContext)
const httpClient = new HttpClient({ baseUrl: process.env.NEXT_PUBLIC_API_URL })
const apiClient = new Api(httpClient)

export function ApiProvider({ children }: PropsWithChildren) {
  const api = useRef(apiClient)
  // Load user data on mount
  // const updateAuthHeader = (token: string) => {
  //   httpClient.instance.defaults.headers.common['Authorization'] = token ? token : '';
  // };

  const value = {
    httpClient,
    api,
    // updateAuthHeader,
  }

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}
