import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%': { transform: 'translate(300px)' },
          '100%': { transform: 'translate(0px)' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out',
      }
    },
  },
  plugins: [],
}
export default config
