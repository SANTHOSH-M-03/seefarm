/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', 'box-shadow': '0 0 20px rgba(34, 197, 94, 0.5)' },
          '50%': { opacity: '0.8', 'box-shadow': '0 0 40px rgba(34, 197, 94, 0.8)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      colors: {
        'farm-green': '#1f7c3f',
        'farm-dark': '#0d4d23',
        'farm-light': '#e8f5e9',
        'farm-accent': '#fbbf24',
      },
      backgroundImage: {
        'gradient-farm': 'linear-gradient(135deg, #1f7c3f 0%, #0d4d23 100%)',
      },
    },
  },
  plugins: [],
}
