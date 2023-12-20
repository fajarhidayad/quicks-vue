/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          1: '#2F80ED',
          2: '#4F4F4F',
          3: '#828282',
          4: '#E0E0E0',
        },
        indicator: {
          1: '#F8B76B',
          2: '#8785FF',
          3: '#EB5757',
          4: '#F2c94C',
        },
        chat: {
          1: '#FCEED3',
          11: '#E5A443',
          2: '#EEDCFF',
          22: '#9B51E0',
          3: '#D2F2EA',
          33: '#43B78D',
        },
        sticker: {
          1: '#E9F3FF',
          2: '#FDCFA4',
          3: '#F9E9C3',
          4: '#AFEBDB',
          5: '#CBF1C2',
          6: '#CFCEF9',
          7: '#F9E0FD',
        },
      },
    },
  },
  plugins: [],
};
