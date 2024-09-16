/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: ['index.html', './src/**/*.{html,js,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['winter', 'dracula'],
  },
  plugins: [require('@tailwindcss/typography'), daisyui],
}
