/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "src/components/**/*.html",
    "src/utils/**/*.ts",
    "src/pages/**/*.html",
  ],
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
      colors: {
        "auth-primary": "#5e4bf1",
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
  plugins: [""],
}
