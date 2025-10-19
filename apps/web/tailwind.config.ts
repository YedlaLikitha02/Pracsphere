import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",       // ✅ App Router pages/components
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",     // ✅ Fallback for older pages
    "./components/**/*.{js,ts,jsx,tsx,mdx}",// ✅ Reusable components
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}", // ✅ Include shared UI (if using Turborepo)
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"], // ✅ Matches your layout.tsx font
      },
      colors: {
        brand: {
          DEFAULT: "#2563EB", // ✅ Custom brand color (blue-600)
          light: "#3B82F6",
          dark: "#1E40AF",
        },
      },
    },
  },
  plugins: [],
};

export default config;
