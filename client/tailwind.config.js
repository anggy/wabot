/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wa-green': '#00a884',
        'wa-dark': '#111b21',
        'bone-white': '#F9F9F7',
      }
    },
  },
  plugins: [],
}
