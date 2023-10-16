/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-darker": "#B7BCFF",
        blue: "#DCF1FF",
        "blue-light": "#DFE1FF",
      },
      content: {
        logo: "url('./assets/logo.png')",
      },
    },
  },
  plugins: [],
};
