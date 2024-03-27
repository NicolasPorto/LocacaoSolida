const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    "postcss-import",
    "tailwindcss",
    "autoprefixer",
    process.env.NODE_ENV === "production" &&
      purgecss({
        content: [
          "./pages/**/*.js",
          "./pages/**/*.jsx", // Adicionado para incluir arquivos JSX
          "./components/**/*.js",
          "./components/**/*.jsx", // Adicionado para incluir arquivos JSX
        ],
        whitelistPatterns: [/^slick-/],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      }),
  ],
};
