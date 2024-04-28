/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      silver:{
        DEFAULT:"#ECEEEF"
      },
      charcoal:{
        grey:"#373a3c"
      },
      gunmetal:{
        DEFAULT:"#55595c"
      },
      slate:{
        grey:"#818a91"
      },
      danger:{
        DEFAULT:"#d9534f"
      },
      water:{
        blue:"#1c7cd5"
      },
      'warm-grey':{
        DEFAULT:"#707070"
      }
    }
  },
  plugins: [
    require('@headlessui/tailwindcss')({ prefix: 'ui' })
  ],
}

