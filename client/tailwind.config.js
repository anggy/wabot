/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sisia-primary': '#204060',
        'sisia-secondary': '#8098a8',
        'sisia-accent': '#a0b8c8',
        'sisia-light': '#e0eaf0',
        'sisia-dark': '#111b21',
        'bone-white': '#F9F9F7',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
