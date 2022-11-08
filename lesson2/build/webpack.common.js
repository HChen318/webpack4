const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    // chunkFilename: '[name],chunk.js',  // 并不是入口js文件，异步加载的间接引用的话生成的名字chunkFilename
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
          // {
          //   loader: "imports-loader?this=>window", // 可以让当前模块的this指向window
          // },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "images/",
            limit: 10240,
          },
        },
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: "file-loader",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]), // 打包之前删除dist目录下的所有内容
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "../"),
    }),
    new webpack.ProvidePlugin({
      // 如果一个模块中使用了$字符串，就会模块里自动里引入jquery模块
      $: "jquery",
    }),
  ],
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: "all", // all>打包同步/异步，async>打包异步
      minSize: 30000, // 大于30KB才会进行代码分隔
      // maxSize: 0, // 大于多少K的时候会进行二次分隔，一般很少用
      minChunks: 1, // 打包生成的文件chunk，有几个用到了模块
      maxAsyncRequests: 5, // 网页最多同时请求5个，多余的不会进行代码分隔
      maxInitialRequests: 3, // 首页入口文件引入最多引入3个这样的js文件
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        // 同步代码分割要符合这个缓存分组的规则
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 如果是在node_module里的话就把这个库放到vendors.js中
          priority: -10, // 优先级
          // name: "vendors.js",
        },
        default: {
          // 默认组
          priority: -20, // 优先级
          reuseExistingChunk: true,
          filename: "common.js",
        },
      },
    },
  },
};
