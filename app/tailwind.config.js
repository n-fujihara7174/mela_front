/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px" },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        "darkseagreen": "#8fbc8f",
        "mediumseagreen": "#3cb371",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
