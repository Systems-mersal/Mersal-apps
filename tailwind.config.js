/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#F2F5FA",
        foreground: "#0F172A",
        card: "#FFFFFF",
        primary: {
          DEFAULT: "#0B5ED7",
          foreground: "#FFFFFF",
          light: "#1D9BF0",
          dark: "#0553B5",
        },
        secondary: {
          DEFAULT: "#E8F0FE",
          foreground: "#0B5ED7",
        },
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#64748B",
        },
        accent: {
          DEFAULT: "#1D9BF0",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        border: "#E5E7EB",
        input: "#F1F5F9",
      },
      fontFamily: {
        tajawal: ["Tajawal_400Regular"],
        "tajawal-medium": ["Tajawal_500Medium"],
        "tajawal-bold": ["Tajawal_700Bold"],
        "tajawal-extrabold": ["Tajawal_800ExtraBold"],
        "tajawal-black": ["Tajawal_900Black"],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.08)",
        primary: "0 4px 20px rgba(11,94,215,0.35)",
      },
    },
  },
  plugins: [],
};
