/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ac: {
          cream: '#fefae0',
          mint: '#76cdbe',
          mintDark: '#286f63',
          wood: '#c68b59',
          woodDark: '#5c3a21',
          grass: '#7ec850',
          dirt: '#d4a373',
          sky: '#a2e8dd'
        }
      }
    },
  },
  plugins: [],
}
