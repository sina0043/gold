
/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';

export default {
  darkMode: ['selector', '[class="p-dark"]'],
  content: ['./src/**/*.{html,ts}'],
  plugins: [PrimeUI],
  theme: {
    screens: {
      xs: '1px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1920px'
    },
    extend: {
      colors: {
        baseGoldColor: "var(--base-gold-color)",
        textColor: "var(--text-color)",
        bgGlasses: "var(--bg-glasses)",
      },
    },
  }
};