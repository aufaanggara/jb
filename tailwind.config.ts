import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Glints-style Clean Light Marketplace Palette
        brand: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          500: "#0066FF",
          600: "#0052CC",
          700: "#003D99",
          DEFAULT: "#0066FF",
        },
        bg: {
          page: "#F0F4FF",
          white: "#FFFFFF",
          surface: "#F8FAFC",
          muted: "#F1F5F9",
          overlay: "#E2E8F0",
          primary: "#FFFFFF",
          secondary: "#F8FAFC",
          card: "#FFFFFF",
        },
        txt: {
          heading: "#0F172A",
          body: "#334155",
          secondary: "#64748B",
          muted: "#94A3B8",
          primary: "#0F172A",
        },
        accent: {
          green: "#10B981",
          gold: "#F59E0B",
          red: "#EF4444",
          purple: "#8B5CF6",
          teal: "#0D9488",
        },
        border: {
          DEFAULT: "#E2E8F0",
          strong: "#CBD5E1",
          brand: "rgba(0, 102, 255, 0.25)",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 10px 25px -5px rgba(0,102,255,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)",
        dropdown: "0 10px 30px rgba(0,0,0,0.1)",
        button: "0 4px 14px rgba(0,102,255,0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
