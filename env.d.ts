declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string
    ENV_LOCAL_AUTH_SECRET: string
    ENV_LOCAL_AUTH_SALT: string
  }
}
