// import "@babel/polyfill";  // 开发第三模块，组件，配置之后会污染全局环境
const arr = [new Promise(() => {}), new Promise(() => {})];

arr.map((item) => {
  console.log(item);
});
