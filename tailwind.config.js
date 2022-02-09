module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        // dots: "url('../src/images/dots.png')",
        
      },
      backgroundColor: (theme) => ({
        ...theme("colors"),
        "dark": "#292B48",
        "gray-main": "#EFEFF5",
        "submenu-light": "#2d2f4e",
        "red-light": "#FD5190",
        "yellow-light": "#FF9F43",
        "blue-light": "#6696FE",
        "green-light": "#46C79E",
        "purple-light": "#9E6DE0",
        "purple-light-2": "#673BB7",
        "purple-light-3": "#8487b9",
        "purple-light-4": "rgba(255, 255, 255, 0.05)",
        "table-light": "rgba(105, 27, 204, 0.05)",
        "table-light-2": "rgba(105, 27, 204, 0.1)",

        "yellow-light-pricing": "#FFF022",
        "home-pink": "#ff6af0",
        "home-blue": "#6700FF",
        "home-yellow": "#fff022", 
      }), 
      borderColor: theme => ({
        ...theme('colors'),
         DEFAULT: theme('colors.gray.300', 'currentColor'),
         "purple-main": '#6700FF' ,
        "purple-light": '#9046FE',
        "pink-main": "#ff6af0", 
        "home-yellow": "#fff022",
        "home-blue": "#6700FF",
        "home-pink": "#ff6af0",
        "contact-gray": "rgba(255,255,255,0.2)",

       }),
       colors: { 
        "submenu-purple": "#8487b9",
        "submenu-light": "#f6f6fa",
        "gray-main": "#3d4465",
        "gray-light": "#8a909d",
        "gray-light-2": "#646c9a",
        "gray-light-3": "#84757", 
        "gray-dark": "#18212c",
        "gray-font": "#b9b9b9",
        "purple-light": "#9E6DE0",
        "red-light": "#FD5190",
        "red-dark": "#e53632",
        
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
