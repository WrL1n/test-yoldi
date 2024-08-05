import { useMediaQuery } from "react-responsive"
import resolveConfig from "tailwindcss/resolveConfig"
import type { Config } from "tailwindcss/types/config"

import config from "../../tailwind.config" // just an alias for the tailwind.config.js

const fullConfig = resolveConfig(config as Config)

const breakpoints = fullConfig?.theme?.screens || {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1920px",
}

export function useBreakpoint<K extends string>(breakpointKey: K) {
  const breakpointValue = breakpoints[breakpointKey as keyof typeof breakpoints]

  const bool = useMediaQuery({
    query: `(max-width: ${breakpointValue})`,
  })
  const capitalizedKey =
    breakpointKey[0].toUpperCase() + breakpointKey.substring(1)

  type KeyAbove = `isAbove${Capitalize<K>}`
  type KeyBelow = `isBelow${Capitalize<K>}`

  return {
    [breakpointKey]: Number(String(breakpointValue).replace(/[^0-9]/g, "")),
    [`isAbove${capitalizedKey}`]: !bool,
    [`isBelow${capitalizedKey}`]: bool,
  } as Record<K, number> & Record<KeyAbove | KeyBelow, boolean>
}
