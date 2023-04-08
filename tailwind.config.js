/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}','./components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#329AFC',
      },
      backgroundImage: {
        'hero': "url('../public/images/background.png')",
      },

    },
  },
  plugins: [],
}
