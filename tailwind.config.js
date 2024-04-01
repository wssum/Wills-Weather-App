/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    colors: {
      'custom-blue': '#007bff',
    },
    fontFamily: {
      sans: ['Inter var', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}

