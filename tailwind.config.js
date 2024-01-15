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
        650: "650px",
        600: "600px",
        300: "300px",
      },
      height: {
        500: "500px",
      },
      translate: {
        a: "-50%",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 2px 0px var(--tw-shadow-color)",
      },
      textShadowTop: {
        sm: "0 -16px 16px var(--tw-shadow-color)",
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
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        // {
        //   "text-shadow-top": (value) => ({
        //     textShadowTop: value,
        //   }),
        // },

        { values: theme("textShadow") }
      );
    },
  ],
};
