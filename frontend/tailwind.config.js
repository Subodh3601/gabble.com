import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {},
  },
  plugins: [require('daisyui')],

  // daisyui: {
  //   themes: [
  //     "light", {
  //       black: {
  //         ...require("daisyui/src/theming/themes")['black'],
  //         primary: "rgb(0,5,0)",
  //         secondary: "rgb(24,24,24)",
  //       }
  //     }
  //   ]
  // },
}