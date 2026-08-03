export const colors = {
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
} as const;

export type ColorKey = keyof typeof colors;
