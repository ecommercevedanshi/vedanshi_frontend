/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {

        primary: "var(--color-primary)",
        primaryHover: "var(--color-primary-hover)",

        bgMain: "var(--bg-main)",
        bgCard: "var(--bg-card)",
        bgSurface: "var(--bg-surface)",

        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textMuted: "var(--text-muted)",

        borderLight: "var(--border-light)",
        borderMedium: "var(--border-medium)",

        stylishFont: "var(--font-stylish)"

      },

      boxShadow: {
        soft: "var(--shadow-soft)"
      }

    },
  },
  plugins: [],
}