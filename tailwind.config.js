/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        space: "#07040F",
        deep: "#120A24",
        lav: "#B9A6FF",
        pinkstar: "#F3B6FF",
        skystar: "#8FD8FF",
        muted: "#B7AECB",
        soft: "#C9C2DC",
        pale: "#E4DEF2",
        live: "#5EEAA0",
      },
      fontFamily: {
        serif: ['"Noto Serif Display"', "Georgia", "serif"],
        sans: ['"Be Vietnam Pro"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      opacity: {
        12: "0.12",
        15: "0.15",
        35: "0.35",
      },
      maxWidth: {
        page: "80rem",
      },
    },
  },
  plugins: [],
};
