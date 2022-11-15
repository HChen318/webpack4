const loaderUtils = require("loader-utils");
module.exports = function (source) {
  // this.query 获取传递的数据
  const options = loaderUtils.getOptions(this);
  const cb = this.async(); // 异步
  setTimeout(() => {
    const result = source.replace("go", options.name);
    cb(null, result);
  }, 2000);
};
