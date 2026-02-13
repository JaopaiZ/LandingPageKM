/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#0a0a0f',
          card: '#12121a',
          gold: '#d4af37',
          softGold: '#f4df9a'
        }
      },
      boxShadow: {
        glow: '0 0 35px rgba(212,175,55,0.2)'
      }
    }
  },
  plugins: []
};
