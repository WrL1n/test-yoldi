import type { LoginDto, SignUpDto } from "@/shared/__generated__/yoldi-api"
import type { AvailableLanguage } from "@/shared/i18n/consts"
import { ROUTES, createLocaleRoute } from "@/shared/routes"
import { useRouter } from "next/navigation"
import type React from "react"
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useApiContext } from "./api-context"

interface AuthContextType {
  isAuthenticated: boolean
}
interface AuthActionsContextType {
  login: (loginDto: LoginDto) => Promise<void>
  signUp: (signUpDto: SignUpDto) => Promise<void>
  logout: () => void
  getToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
})
const AuthActionsContext = createContext<AuthActionsContextType>({
  login: async () => {},
  signUp: async () => {},
  logout: () => {},
  getToken: async () => null,
})

export const useAuthContext = () => useContext(AuthContext)
export const useAuthActionsContext = () => useContext(AuthActionsContext)

const AUTH_CHECK_TIMEOUT = 30 * 1000
// const TOKEN_EXPIRATION_TIME = 20 * 1000 // 1min
const TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000 // 24h
const SECRET_KEY = process.env.ENV_LOCAL_AUTH_SECRET
const SALT = process.env.ENV_LOCAL_AUTH_SALT
const LOCAL_STORAGE_KEY = "authData"

async function getKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder()
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET_KEY),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"],
  )

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode(SALT),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  )
}

async function encryptData(data: string): Promise<string> {
  const key = await getKey()
  const encoder = new TextEncoder()
  const encodedData = encoder.encode(data)

  const iv = window.crypto.getRandomValues(new Uint8Array(12))
  const encryptedContent = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    encodedData,
  )

  const encryptedContentArr = new Uint8Array(encryptedContent)
  const buf = new Uint8Array(iv.byteLength + encryptedContentArr.byteLength)
  buf.set(iv, 0)
  buf.set(encryptedContentArr, iv.byteLength)
  return btoa(String.fromCharCode.apply(null, Array.from(buf)))
}

async function decryptData(encryptedData: string): Promise<string> {
  const key = await getKey()
  const decoder = new TextDecoder()
  const data = Uint8Array.from(atob(encryptedData), (c) => c.charCodeAt(0))

  const iv = data.slice(0, 12)
  const encryptedContent = data.slice(12)

  const decryptedContent = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv },
    key,
    encryptedContent,
  )

  return decoder.decode(decryptedContent)
}

interface AuthProviderProps {
  locale: AvailableLanguage
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  locale,
  children,
}) => {
  const { api } = useApiContext()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const getToken = useCallback(async (): Promise<string | null> => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!storedData) return null

    try {
      const decryptedData = await decryptData(storedData)
      const { token, expiration } = JSON.parse(decryptedData)

      if (Date.now() > expiration) {
        localStorage.removeItem(LOCAL_STORAGE_KEY)
        setIsAuthenticated(false)
        return null
      }

      return token
    } catch (error) {
      console.error("Failed to get token:", error)
      return null
    }
  }, [])

  const setAuthData = async (newToken: string) => {
    const newExpirationTime = Date.now() + TOKEN_EXPIRATION_TIME
    const dataToStore = JSON.stringify({
      token: newToken,
      expiration: newExpirationTime,
    })

    try {
      const encryptedData = await encryptData(dataToStore)
      localStorage.setItem(LOCAL_STORAGE_KEY, encryptedData)
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Failed to encrypt and store token:", error)
    }
  }

  const login = useCallback(
    async (loginDto: LoginDto) => {
      if (!api) {
        throw new Error("API is not initialized")
      }

      try {
        const response = await api.current.api.login(loginDto)
        console.log("ttt", { response })
        await setAuthData(response.value)
        router.push(createLocaleRoute(locale, ROUTES.home))
      } catch (error) {
        console.error("Login failed:", error)
        throw error
      }
    },
    [api, router, locale],
  )

  const signUp = useCallback(
    async (signUpDto: SignUpDto) => {
      if (!api) {
        throw new Error("API is not initialized")
      }

      try {
        const response = await api.current.api.signUp(signUpDto)
        await setAuthData(response.value)
        router.push(createLocaleRoute(locale, ROUTES.home))
      } catch (error) {
        console.error("Sign up failed:", error)
        throw error
      }
    },
    [api, router, locale],
  )

  const logout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    setIsAuthenticated(false)
    router.push(createLocaleRoute(locale, ROUTES.home))
  }, [router, locale])

  const checkAuthentication = useCallback(async () => {
    const token = await getToken()
    setIsAuthenticated(!!token)
  }, [getToken])

  useEffect(() => {
    checkAuthentication()
  }, [checkAuthentication])

  useEffect(() => {
    checkAuthentication()

    const intervalId = setInterval(() => {
      checkAuthentication()
    }, AUTH_CHECK_TIMEOUT)

    return () => clearInterval(intervalId)
  }, [checkAuthentication])

  const authContextValue = useMemo(
    () => ({ isAuthenticated }),
    [isAuthenticated],
  )
  const authActionsContextValue = useMemo(
    () => ({ getToken, login, signUp, logout }),
    [getToken, login, signUp, logout],
  )

  return (
    <AuthContext.Provider value={authContextValue}>
      <AuthActionsContext.Provider value={authActionsContextValue}>
        {children}
      </AuthActionsContext.Provider>
    </AuthContext.Provider>
  )
}
