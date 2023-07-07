import type { Config } from 'tailwindcss'

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'ibm-plex': ['"IBM Plex Serif"', "serif"]
      }
    },
  },
  plugins: [],
} satisfies Config

