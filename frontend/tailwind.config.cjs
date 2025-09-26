/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        warmbg: "#FFF7F2",
        softpink: "#FFBBB7",
        coral: "#FF6B6B"
      }
    }
  },
  plugins: []
}
