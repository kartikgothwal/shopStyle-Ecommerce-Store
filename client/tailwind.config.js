/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        one: "url('./src/assets/home-animation-bg-images/one.webp)",
        two: "url('./src/assets/home-animation-bg-images/two.webp)",
        three: "url('./src/assets/home-animation-bg-images/three.webp)",
        four: "url('./src/assets/home-animation-bg-images/fours.webp)",
        five: "url('./src/assets/home-animation-bg-images/five.webp)",
      },
      keyframes: {
        typing: {
          from: { width: "0" },
        },
        cursor: {
          "50%": { borderColor: "tranparent" },
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Use an array to define fallback fonts
        rubik: ["Rubik", "sans-serif"],
      },
      screens: {
        mobileSize: "430px",
        VerySmallmobileSize: "350px",
      },
      transitionProperty: {
        height: "height",
        width: "width",
        spacing: "margin, padding",
      },
    },
  },
  plugins: [],
});
