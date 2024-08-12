/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkColor: '#6D6875',
        mainColor: '#B5838D',
        lighterColor: '#E5989B',
      },
    },
  },
  plugins: [],
}
