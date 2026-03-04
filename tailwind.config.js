module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
        }
      },
      backgroundImage: {
        'gradient-animated': 'linear-gradient(90deg, rgba(79,70,229,0.15), rgba(139,92,246,0.15), rgba(99,102,241,0.15))'
      },
      keyframes: {
        'gradient-move': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        'float': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
          '100%': { transform: 'translateY(0px)' },
        }
      },
      animation: {
        'gradient-move': 'gradient-move 8s ease infinite',
        'float-slow': 'float 6s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
