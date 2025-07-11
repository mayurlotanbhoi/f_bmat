/** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
// module.exports = {
//   content: ['./src/**/*.{js,ts,jsx,tsx}'],
// };

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: ['text-primary', 'bg-white', 'rounded-2xl',], // add any needed classes


  theme: {
    extend: {
      fontFamily: {
        marathi: ['"Baloo 2"', 'cursive'],
      },
      keyframes: {
        'expand-height': {
          '0%': { height: '0', opacity: '0' },
          '100%': { height: '100%', opacity: '1' },
        },
        'collapse-height': {
          '0%': { height: '100%', opacity: '1' },
          '100%': { height: '0', opacity: '0' },
        },
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
        'expand-height': 'expand-height 0.4s ease-out forwards',
        'collapse-height': 'collapse-height 0.4s ease-in forwards',
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

