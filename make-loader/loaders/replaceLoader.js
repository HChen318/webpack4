module.exports = function (source) {
  // 不能使用箭头函数，因为this，拿到webpack的一些的方法
//   console.log(this.query); // 接受webpack配置传递过来的参数，可以借助第三方loader-utils工具解析
  return source.replace("go", "come on.");
};
