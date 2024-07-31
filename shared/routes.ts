export enum ROUTES {
  login = "log-in",
  register = "register",
  home = "",
  account = "account",
}

export const createLocaleRoute = (locale: string, key: ROUTES) => {
  return `/${locale}/${key}`
}
