/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#117066",
        primaryDark: "#115e59",
        primaryDeep: "#0d4a46",
        peach: "#ffccaa",
        peachGold: "#fec172",
        background: "#f9fafb",
        backgroundWarm: "#f9f6f2",
        text: "#1f2937",
        textMuted: "#6b7280",
        border: "#e5e7eb",
        success: "#10b981",
        successBg: "#d1fae5",
        danger: "#ef4444",
        white: "#ffffff",
      },
      fontFamily: {
        cairo: ["Cairo_400Regular"],
        "cairo-semibold": ["Cairo_600SemiBold"],
        "cairo-bold": ["Cairo_700Bold"],
        inter: ["Inter_400Regular"],
        "inter-semibold": ["Inter_600SemiBold"],
        "inter-bold": ["Inter_700Bold"],
      },
    },
  },
  plugins: [],
};
