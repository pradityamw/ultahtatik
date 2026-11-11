/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dreamy: {
          50: '#fff5f7',
          100: '#ffe4ec',
          200: '#ffd1dc',
          300: '#ffb2c6',
          400: '#ff80a3',
          500: '#ff4f80',
          600: '#e82963',
          700: '#c5164d',
          800: '#a31542',
          900: '#88163c',
        },
        blush: {
          light: '#fff0f3',
          DEFAULT: '#ffd6df',
          dark: '#f497aa',
        },
        cream: {
          50: '#ffffff',
          100: '#fdfbf7',
          200: '#faf6f0',
          300: '#f4ece1',
          400: '#e8dbca',
        },
        gold: {
          light: '#fdf6e2',
          DEFAULT: '#d4af37',
          champagne: '#e6ca65',
          dark: '#aa820a',
        },
        lavender: {
          light: '#faf5ff',
          DEFAULT: '#f3e8ff',
          accent: '#c084fc',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cursive: ['"Dancing Script"', '"Caveat"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-glow': '0 0 25px rgba(255, 142, 175, 0.45)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.4)',
        'polaroid': '0 10px 25px -5px rgba(232, 110, 142, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'float-slow': 'floating 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
