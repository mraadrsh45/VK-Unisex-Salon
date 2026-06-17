/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F4E6C3',
          DEFAULT: '#D4AF37',
          dark: '#C5A028',
          glow: '#FFDF7A',
          pale: '#AA7C11',
        },
        charcoal: {
          light: '#222222',
          DEFAULT: '#121212',
          dark: '#080808',
          card: 'rgba(20, 20, 20, 0.6)',
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)',
        'dark-gradient': 'linear-gradient(180deg, #151515 0%, #0B0B0B 100%)',
        'gold-glow': 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 70%)',
      },
      boxShadow: {
        'gold-sm': '0 2px 8px -1px rgba(212, 175, 55, 0.2)',
        'gold-md': '0 4px 12px -2px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 10px 25px -5px rgba(212, 175, 55, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
