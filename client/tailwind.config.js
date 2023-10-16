/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "button-base": "#0085FF",
        "button-hover": "#339DFF",
        "button-active": "#1272CC",
        "blue-darker": "#B7BCFF",
        blue: "#DCF1FF",
        "blue-light": "#DFE1FF",
        "gray-background": "#F5F5F5",
        "gray-border": "#EDEDEC",
        "gray-text": "#B0B1B3",
      },
      content: {
        logo: "url('./assets/logo.png')",
      },
    },
  },
  plugins: [],
};
