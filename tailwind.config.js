/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        comic: ['"Bangers"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        background: "#0a0a0a", // Noir Black
        primary: "#FFD700", // Comic Yellow
        secondary: "#FF0033", // Action Red
        surface: "#1a1a1a",
        ink: "#000000",
      },
      boxShadow: {
        'comic': '4px 4px 0px 0px #000000', // Hard shadow for panels
        'comic-hover': '6px 6px 0px 0px #FFD700', // Yellow shadow on hover
      },
      backgroundImage: {
        'halftone': "radial-gradient(circle, #333 1px, transparent 1px)", // CSS Halftone
      },
      backgroundSize: {
        'halftone': '20px 20px',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}
