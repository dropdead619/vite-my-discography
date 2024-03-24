/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Proxima Nova', 'Helvetica', 'Arial', 'sans-serif'],
    },

    extend: {
      container: {
        padding: '16px',
      },
      screens: {
        'ultra-sm': '364px',
      },
      colors: {
        'label-divider': '#E0E0E0',
      },
      backgroundColor: {
        'theme-dark-4': '#1A1A1A',
        'theme-dark-3': '#212121',
        'theme-dark-2': '#252525',
        'theme-dark-1': '#272727',
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  plugins: [],
};
