/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/renderer/index.html",
    "./src/renderer/src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "rgba(255,255,255,0.81)",
        "main-darken": "rgba(255,255,255,0.282)",
      },
    },
  },
  plugins: [],
};
