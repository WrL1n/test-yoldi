// import { Footer } from "@/components/footer"
// import { Header } from "@/components/header"
import { Providers } from "@/components/providers"
import type { PropsWithChildren } from "react"

export function Page({ children }: PropsWithChildren) {
  return (
    <Providers>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-full">
        {/* <Header /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </div>
    </Providers>
  )
}
