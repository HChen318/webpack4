const webpack = require("webpack");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const devConfig = {
  mode: "development",
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "./dist",
    open: true,
    hot: true,
  },
  // optimization: {
  //   // webapck会对所有模块tree shaking，有一些模块不希望做tres shaking，这里配置usedExports然后再package sideEffects写一些内容
  //   // usedExports: true,
  // },
};

module.exports = merge(commonConfig, devConfig);
