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
      animation: {
        "slide-in-top":
          "slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)    both",
        "slide-up-top":
          "slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   reverse both",
        "fade-in":
          "fade-in 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
        "fade-out":
          "fade-in 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)   reverse both",
      },
      keyframes: {
        "slide-in-top": {
          "0%": {
            transform: "translateY(-1000px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "slide-up-top": {
          "0%": {
            transform: "translateY(-1000px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        "fade-out": {
          "0%": {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
