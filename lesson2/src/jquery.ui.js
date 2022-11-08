export function ui() {
  $("body").css("background", "skyblue");
}

// webpack
// new webpack.ProvidePlugin({  // 如果一个模块中使用了$字符串，就会模块里自动里引入jquery模块
//     $: "jquery",
//   }),
