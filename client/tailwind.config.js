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
        }
      },
      boxShadow: {
        repair:{
          card: '0 4px 16px -2px rgba(0,0,0,0.1)',
          form: '0 4px 16px -2px rgba(0,0,0,0.1)'
        }
      },
    },
    screens:{
      'xs':'500px',
      ...defaultTheme.screens
    }
  },
  plugins: [],
}
