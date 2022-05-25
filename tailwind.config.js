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
      backgroundColor: {
        'theme-dark': '#1A1A1A',
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  plugins: [],
};
