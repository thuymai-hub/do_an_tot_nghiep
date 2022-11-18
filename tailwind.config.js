/** @type {import('tailwindcss').Config} **/
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#00b0ff',
        'second-color': '#0e3253',
        'second-bold-color': '#0B263E',
        'body-main': '#f5f5f9',
        'border-color--1': '#d9d9d9',
        'color-border-2': '#1b4c7a',
        'medium-grey': '#525b65',
        'danger-color': '#ff4d4f'
      },
      backgroundImage: {
        404: "url('/src/assets/images/background/page-misc-error-light.png)",
        'background-login': "url('/src/assets/images/background/7171197.jpg)"
      }
    },
    fontFamily: { 'josefin-sans': ['Josefin Sans', 'sans-sefits'] },
    screens: {
      tablet: '768px',
      // => @media (min-width: 640px) { ... }

      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }

      desktop: '1280px'
      // => @media (min-width: 1280px) { ... }
    }
  },
  plugins: []
};
