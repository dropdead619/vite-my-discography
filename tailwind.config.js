module.exports = {
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
      screens: {
        'ultra-sm': '364px',
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
