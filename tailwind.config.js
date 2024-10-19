/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'noise': "url('https://www.transparenttextures.com/patterns/noise.png')", // Static noise texture
      },
    },
  },
  plugins: [],
}