export enum ROUTES {
  login = "log-in",
  register = "register",
}

export const createLocaleRoutes = (locale: string) => {
  return {
    login: `/${locale}/${ROUTES.login}`,
    register: `/${locale}/${ROUTES.register}`,
  }
}
