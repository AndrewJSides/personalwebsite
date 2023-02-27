/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        1: "1px",
      },
      width: {
        1: "1px",
        1.5: "2px",
        200: "200px",
      },
    },
  },
  plugins: [],
};
