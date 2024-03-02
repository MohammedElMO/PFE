/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "src/components/**/*.html"],

  theme: {
    
    extend: {
      fontFamily:{
        "pop":["Poppins","sans-serif"]
      }

    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
