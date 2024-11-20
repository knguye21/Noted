import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        base800: "#121212",
        base600: "#444444",
        base300: "#d3d3d3",
        base100: "#e9e7e7",
        orange800: "#ec6a2c",
        orange600: "#f57924",
      },
    },
  },
  plugins: [],
} satisfies Config;
