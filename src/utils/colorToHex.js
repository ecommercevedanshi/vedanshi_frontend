const colorMap = {
  white: "#ffffff",
  black: "#000000",
  red: "#ff0000",
  blue: "#2563eb",
  darkgreen:"093131",
  green: "#16a34a",
  yellow: "#facc15",
  grey: "#6b7280",
  gray: "#6b7280",
  pink: "#ec4899",
  purple: "#9333ea",
  brown: "#78350f",
  orange: "#f97316",
  navy: "#1e3a8a",
};

export const getColorHex = (colorName, fallbackHex) => {
  const key = colorName?.toLowerCase();
  return colorMap[key] || fallbackHex || "#cccccc";
};