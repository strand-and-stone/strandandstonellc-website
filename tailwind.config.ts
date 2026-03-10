import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        stone: {
          accent: "#C9B99A",
          muted: "#8C7D6B",
          dark: "#1A1714",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.25em",
        widest3: "0.35em",
      },
    },
  },
  plugins: [],
};
export default config;
