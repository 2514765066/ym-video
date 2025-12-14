/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/renderer/index.html",
    "./src/renderer/src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "rgba(255,255,255,0.8)",

        sub: "#888",

        "main-dark1": "rgba(255,255,255,0.6)",
        "main-dark2": "rgba(255,255,255,0.3)",
        "main-dark3": "rgba(255, 255, 255, 0.03)",

        "changing": "#0CBC4D",
        "222": "#222",
        "333": "#333",
        "444": "#444",

        "bg-sub": "#292929",

        primary: "#0078d4",
        bg: "#191919",
        list: "#202020",
        border: "#2a2a2a",
        hover: "rgba(255, 255, 255, 0.05)",
      },

      aspectRatio: {
        "3/4": "3/4",
      },
    },
  },
  plugins: [],
};
