/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F5F1E8',
        linen: '#E9E1D3',
        sand: '#D6C8B1',
        stone: { warm: '#8C8577' },
        charcoal: '#22211E',
        ink: '#3A3833',
        olive: { DEFAULT: '#687052', dark: '#4F5540', light: '#A7AC90' },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
      maxWidth: { site: '1440px' },
      transitionTimingFunction: { 'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)' },
    },
  },
  plugins: [],
};
