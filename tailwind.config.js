/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        magicBlack: {
          500:"#202023",
          600: "#27272F",
        },
        mudblack: "#171c21",
        antiquewhite: "#f0e7db",
        antiquewhitey: "#F1EDE6",
        royalblue: "#5661F2",
        poisongreen: "#29D67F",
        
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
