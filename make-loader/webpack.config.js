const path = require("path");


module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolveLoader: {
    // 当使用loader，先在node_modules找，找不到继续在loaders目录找
    modules: ["node_modules", "./loaders"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          //   {
          //     loader: path.resolve(__dirname, "./loaders/replaceLoader.js"),
          //   },
          //   {
          //     loader: path.resolve(__dirname, "./loaders/replaceLoaderAsync.js"),
          //     options: {
          //       name: "hxf go", // 传递给自定义loader的数据
          //     },
          //   },
          { loader: "replaceLoader" }, // 方式2 简洁写法配合resolveLoaders
          {
            loader: "replaceLoaderAsync", //     options: {
            options: {
              name: "hxf go",
            },
          },
        ],
      },
    ],
  }
};
