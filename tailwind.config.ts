import type { Config } from "tailwindcss";
const flowbite = require('flowbite-react/tailwind')

const config: Config = {
  
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        'main': '#FFFDFA'
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite'
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "rotate(-7deg)" }, 
          "12.5%": { transform: "rotate(7deg)" }, 
          "25%": { transform: "rotate(-7deg)" },
          "37.5%": { transform: "rotate(7deg)" }, 
          "50%": { transform: "rotate(0deg)" }, 
          "100%": { transform: "rotate(0deg)" },
        }
      }
    },
  },
  plugins: [
    flowbite.plugin()
  ]

};
export default config;
