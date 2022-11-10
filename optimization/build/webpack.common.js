const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");

const makePlugins = (config) => {
  const plugins = [
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "../"),
    }),
  ];

  Object.keys(config.entry).forEach((item) => {
    plugins.push(
      new HtmlWebpackPlugin({
        template: "src/index.html",
        filename: `${item}.html`,
        chunks: ["vendors", item], // 引入的打包文件有哪些
      })
    );
  });
  const files = fs.readdirSync(path.resolve(__dirname, "../dll"));
  files.forEach((file) => {
    if (/.*\.dll.js/.test(file)) {
      plugins.push(
        new AddAssetHtmlWebpackPlugin({
          filepath: path.resolve(__dirname, "../dll", file),
        })
      );
    }
    if (/.*\.manifest.json/.test(file)) {
      plugins.push(
        new webpack.DllReferencePlugin({
          manifest: path.resolve(__dirname, "../dll", file),
        })
      );
    }
  });
  return plugins;
};

const configs = {
  // entry: "./src/index.js", // spa
  entry: {
    // mpa
    index: "./src/index.js",
    list: "./src/list.js",
  },
  output: {
    // filename: "[name].js",
    // chunkFilename: '[name],chunk.js',  // 并不是入口js文件，异步加载的间接引用的话生成的名字chunkFilename
    path: path.resolve(__dirname, "../dist"),
  },
  resolve: {
    extensions: [".js", ".jsx"], // 引入其他模块的时候，先到对应目录的以js结尾的文件，jsx结尾的文件
    // mainFiles: ['index'] // 引入模块文件，省去引用路径
    // alias: {
    //   // 别名
    //   @: path.resolve(__dirname,'../src/child')
    // },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
  optimization: {
    usedExports: true, // webapck会对所有模块tree shaking，有一些模块不希望做tres shaking，这里配置usedExports然后再package sideEffects写一些内容
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
          test: /[\\/]node_modules[\\/]/, // 如果是在node_module第三方模块里的话就把这个库放到vendors.js中
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

configs.plugins = makePlugins(configs);

module.exports = configs;
