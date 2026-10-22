import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        abysse: "#0B3C5D",
        lagon: "#1CA7A8",
        ecume: "#F4F9FB",
        corail: "#FF7F5C",
        sable: "#F2E8D5",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
