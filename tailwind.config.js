/** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    extend: {
      keyframes: {
        'fadeIn': {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'slide-in-top': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-out-top': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        'slide-in-bottom': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-out-bottom': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in-out',
        'slide-in-right': 'slide-in-right 0.3s ease forwards',
        'slide-out-right': 'slide-out-right 0.3s ease forwards',
        'slide-in-left': 'slide-in-left 0.3s ease forwards',
        'slide-out-left': 'slide-out-left 0.3s ease forwards',
        'slide-in-top': 'slide-in-top 0.3s ease forwards',
        'slide-out-top': 'slide-out-top 0.3s ease forwards',
        'slide-in-bottom': 'slide-in-bottom 0.3s ease forwards',
        'slide-out-bottom': 'slide-out-bottom 0.3s ease forwards',
      },
    },
  },
  plugins: [],
};

