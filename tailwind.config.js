const mainColor = "#D4D4D4";
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: mainColor,
            a: {
              color: mainColor,
            },
            h1: {
              color: mainColor,
            },
            h2: {
              color: mainColor,
            },
            h3: {
              color: mainColor,
            },
            h4: {
              color: mainColor,
            },
            h5: {
              color: mainColor,
            },
            strong: {
              color: mainColor,
            },
            blockquote: {
              color: mainColor,
            },
            code: {
              color: mainColor,
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
