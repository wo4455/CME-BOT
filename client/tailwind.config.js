/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      colors: {
        ltBlue: '#5ba1bd',
        dkBlue: '#1f3055',
      },
    },
  },
  plugins: [],
}