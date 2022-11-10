console.log("hello, this is dell");

// serviceWorker PWA 配置
// 1.安装workbox-webpack-plugin  插件
// 2.new WorkboxPlugin.GenerateSW({
// 		clientsClaim: true,
// 		skipWaiting: true
//})
// 3.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("service-worker registed");
      })
      .catch((error) => {
        console.log("service-worker register error");
      });
  });
}
