import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#0b0b0f',
          card: '#131319',
          gold: '#d4af37',
          softGold: '#f2d87b'
        }
      },
      boxShadow: {
        glow: '0 0 35px rgba(212, 175, 55, 0.2)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' }
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

export default config;
