/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', ...defaultTheme.fontFamily.sans],
        'poppins': ['Poppins', 'sans-serif']
      },
      colors: {
        primary: colors.blue[500],
        neutral: colors.gray[500],
        danger: colors.red[500],
      },
    },
  },
  plugins: [],
}
