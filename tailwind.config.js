module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        openSan: "'Open Sans', sans-serif",
        nunito: "'Nunito', sans-serif",
      },
      width: {
        700: "700px",
        600: "600px",
        300: "300px",
      },
      height: {
        500: "500px",
      },
      translate: {
        a: "-50%",
      },
    },
  },

  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        " .no-scrollbar::-webkit-scrollbar ": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
