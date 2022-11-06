const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development", // production or development
  entry: "./src/index.js", // 等价于{"main" : "./src/index.js"} 打包后的文件默认main.js
  output: {
    filename: "[name].js", // [name].js 用占位符,根据entry的key值来决定的
    path: path.resolve(__dirname, "dist"),
    // publicPath: "http://cdn.com.cn", //  把打包后的文件引入cdn的地址
  },
  module: {
    // 模块，打包规则
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 忽略第三方模块js代码，打包速度变快
        loader: "babel-loader", // es6>es5 babel-loader处理js，webpack和babel做通信的桥梁,要把es6转es5还要其他模块才能
        // options: {
        //   // presets: [
        //   //   [
        //   //     "@babel/preset-env", // es6 > es5
        //   //     {
        //   //       useBuiltIns: "usage",// 仅对业务代码@babel/polyfill高级语法转义,解决业务代码es6-es5，不然会全部引入@babel/polyfill
        //   //     },
        //   //   ],
        //   // ],
        //   plugins: [
        //     [
        //       // @babel/polyfill开发第三模块，组件，配置之后会污染全局环境,plugins这种方式不会无法全局环境
        //       "@babel/plugin-transform-runtime",
        //       {
        //         corejs: 2, //
        //         helpers: true,
        //         regenerator: true,
        //         useESModules: true,
        //       },
        //     ],
        //   ],
        // },
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader", // loader作用 > 不能识别非js结尾后缀模块
          options: {
            name: "[name]_[hash].[ext]", // placeholder占位符 > 图片的名字和后缀
            outputPath: "images/",
            limit: 2048, // 大于2048字节的，像file-loader一样打包到dist目录下生成文件，小于2KB，会变成base64直接放到js中
          },
        },
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: "file-loader", // loader作用 > 不能识别非js结尾后缀模块
        },
      },
      {
        test: /\.scss$/,
        // css-loader > 分析几个css文件之间的关系，合并成一段css，style-loader > 得到css内容后，会把内容挂载到head标签内
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // 在index.scss额外引入了scss，有可能不会从上往上执行postcss-loader和sass-loader，importLoaders配置后就是从下往上走所有的loader
              importLoaders: 2,
              // modules: true, // 开启css模块化的打包
            },
          },
          "sass-loader",
          "postcss-loader",
        ], // loader 从下到上，从右到左
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    // plugin可以在webpack运行到某个时刻帮你做一些事情
    new HtmlWebpackPlugin({
      // 打包结束后，自动生成html文件，并把打包生成的js自动引入到这个html中
      template: "src/index.html",
    }),
    new CleanWebpackPlugin(["dist"]), // 打包之前删除dist目录下的所有内容
    new webpack.HotModuleReplacementPlugin(),
  ],
  // sourceMap 就是一个映射关系，打包后的文件能对应源码的文件
  // eval 提高打包速度
  // source-map // 生成.map的文件
  // inline-source-map > .map文件放到打包的main文件中了
  // cheap-inline-source-map  cheap 出错,只带列信息，不带行信息
  // cheap-module-inline-source-map  第几行出错,module包含第三方
  // cheap-module-eval-source-map  // 开发环境中，提示比较全，打包速度比较快
  // cheap-module-source-map  // 开发环境中，提示比较全，打包速度比较快
  devtool: "cheap-module-eval-source-map", // 开发环境中，提示比较全，打包速度比较快
  // development devtool: "cheap-module-eval-source-map"
  // production devtool: "cheap-module-source-map"
  devServer: {
    // 方便开发环境调试源代码
    // 起一个http的服务器，默认端口port：8080，会打包代码放到dist目录，放到内存里，提高打包速度
    contentBase: "./dist",
    open: true,
    hot: true, //  开启HotModuleReplacementPlugin热更新
    hotOnly: true, // 浏览器不会自动刷新
    // proxy: { // 代理
    //   "/api": "http: //localhost:3000",
    // },
  },
  optimization: {  // dev环境还会有这段代码，但有个提示
    // dev环境开启Tree Shaking，在sideEffects配置false，对所有模块进行Tree Shaking。sideEffects作用是有可能引入的是import ‘xxx’ 这时候可能没有模块导出就可能被忽略掉所以要在sideEffects：[import ‘xxx’]加上对应的模块，避免tree shaking
    usedExports: true,
  },
};
