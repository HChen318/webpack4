const path = require("path");
const CopyrightWebpackPlguin = require("./plugins/copyright-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [new CopyrightWebpackPlguin()],
};
