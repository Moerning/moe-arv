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
        DEFAULT:"#d9534f",
        text:"#9f4f48"
      },
      water:{
        blue:"#1c7cd5"
      },
      'warm-grey':{
        DEFAULT:"#707070"
      },
      'pinkish-grey':{
        DEFAULT:"#e7cecd",
        pale:"#efdfdf"
      },
      'dark-sky':{
        blue:"#56c0e0",
        soft:"#8ac8db"
      },
      pale:{
        red:"#d9534f"
      },
      success:{
        DEFAULT:"#5cb85c",
        pale:"#e2eed8"
      }
    }
  },
  plugins: [
    require('@headlessui/tailwindcss')({ prefix: 'ui' })
  ],
}

