const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "library.js",
    library: "library", // <script src="library.js"> </script> 打包挂载library全局变量上
    // import xxx from 'libray'  require('library')  require(['library'],function(){})
    libraryTarget: "umd", // umd库打包方式，不管在cmj,还是esm，还是引入amd方式都可以
  },
  externals: ["lodash"],  // 打包的时候忽略lodash
};
