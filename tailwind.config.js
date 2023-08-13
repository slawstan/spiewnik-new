/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        main: {
          500: '#1976D2',
        }
      }
    },
    fontFamily: {
      quicksand: ['QuickSand', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', 'sans-serif'],
    },
    fontWeight: {
      default: 500,
      thin: 400,
      bold: 700,
    }
  },
  plugins: [],
}

