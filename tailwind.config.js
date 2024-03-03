/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "src/components/**/*.html"],
  darkMode: "selector",

  theme: {
    extend: {
      fontFamily: {
        pop: ["Poppins", "sans-serif"],
      },
      background: {
        side: `linear-gradient(
          303deg,
          rgba(120, 26, 235, 1) 20%,
          rgba(32, 32, 186, 0.8631827731092436) 65%
        )`,
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
}
