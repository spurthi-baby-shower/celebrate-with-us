/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: '#FDF8F0',
        ivory: '#FFFFF5',
        gold: '#B8860B',
        'gold-light': '#D4A843',
        'gold-pale': '#F5E6C8',
        blush: '#FFF0E8',
        maroon: '#800020',
        'peacock': '#006064',
        'deep-green': '#1B5E20',
        saffron: '#E65100',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        script: ['Great Vibes', 'cursive'],
        kannada: ['Noto Sans Kannada', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
