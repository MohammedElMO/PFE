/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/components/**/*.html",
    "./src/utils/**/*.ts",
    "./src/pages/favourites/medicines.html",
    "./src/pages/**/*.ts",
    "./src/pages/auth/**/*.html",
    "./src/pages/profile/**/*.html",
    "./src/pages/profile/setting.html",
    "./src/pages/profile/*.ts",
    "./src/pages/map/*.{ts,js,html}",
    "./src/pages/pharmacy/pharmacy_page/*.{ts,js}",
  ],
  darkMode: "selector",

  theme: {
    extend: {
      fontFamily: {
        pop: ["Poppins", "sans-serif"],
        marri: ["Merriweather", "sans-serif"],
        mont: ["Montserrat", "sans-serif"],
      },
      background: {
        side: `linear-gradient(
          303deg,
          rgba(120, 26, 235, 1) 20%,
          rgba(32, 32, 186, 0.8631827731092436) 65%
        )`,
      },
      colors: {
        primary: "#0091ea",
        secondary: "#42a5f5",
        tog: "#6196a6",
        titles: "#5f5D9c",
        switchers: "#a4ce9e",
        dark: {
          "login-primary": "#2897a0dd",
        },
        state: {
          "signin-btn": "#1ac1d1dd",
        },
      },
      keyframes: {
        swing: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        swing: "swing 1s ease-in-out infinite ",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
}
