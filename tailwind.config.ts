import TailwindForms from "@tailwindcss/forms"
import TailwindTypography from "@tailwindcss/typography"
import type { Config } from "tailwindcss"
import TailwindRadix from "tailwindcss-radix"

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        background: {
          secondary: "#F3F3F3",
          DEFAULT: "#FFFFFF",
        },
        gray: {
          DEFAULT: "#838383",
        },
        strokes: { secondary: "#E6E6E6", DEFAULT: "#D4D4D4" },
      },
      lineHeight: ({ theme }) => ({
        ...theme("spacing"),
        140: "140%",
        160: "160%",
      }),
      fontSize: ({ theme }) => ({
        title: [30, { lineHeight: "140%", letterSpacing: 0, fontWeight: 500 }],
        subtitle: [
          18,
          { lineHeight: "140%", letterSpacing: 0, fontWeight: 500 },
        ],
        paragraph: [
          16,
          { lineHeight: "160%", letterSpacing: 0, fontWeight: 400 },
        ],
        "paragraph-mini": [
          12,
          { lineHeight: "160%", letterSpacing: 0, fontWeight: 400 },
        ],
        "button-text": [
          16,
          { lineHeight: "160%", letterSpacing: 0, fontWeight: 500 },
        ],
        ...theme("spacing"),
      }),
    },
  },
  plugins: [TailwindForms, TailwindRadix({}), TailwindTypography],
}
export default config
