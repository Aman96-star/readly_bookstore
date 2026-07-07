/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

    keyframes: {
      fadeIn: {
        from: {
          opacity: "0",
          transform: "translateY(14px)",
        },
        to: {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
    },
    animation: {
      fadeIn: "fadeIn .4s ease both",
    },

    },
  },
  plugins: [],
};