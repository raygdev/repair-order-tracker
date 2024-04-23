/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
const defaultTheme = require('tailwindcss/defaultTheme')

// eslint-disable-next-line
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        btn: {
          primary: '#110372',
          secondary: '#0455C0'
        },
        form: {
          header: '#0455C0'
        },
        status: {
          completed: '#5CB85C'
        },
        ro: {
          slate: {
            100: '#EEEFF2',
            300: '#BBBCC3',
            500: '#70717B',
            700: '#373848',
            900:  '#060820'
          },
          'link-primary': '#110372',
          'link-disable': '#3820E1',
          'link-hover': '#3e3295'
        }
      },
      boxShadow: {
          card: '0 4px 16px -2px rgba(0,0,0,0.1)',
          form: '0 4px 16px -2px rgba(0,0,0,0.25)'
      },
      backgroundImage: {
        'vehicle-mobile': "url('/src/assets/vehicle-mobile.png')"
      }
    },
    screens:{
      'xs':'500px',
      ...defaultTheme.screens
    }
  },
  plugins: [],
}
