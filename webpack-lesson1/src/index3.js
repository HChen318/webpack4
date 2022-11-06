//  new webpack.HotModuleReplacementPlugin(),hot: true, hotOnly: true,
import "./style3.css";
// css热更新，不需要写js一样的代码是因为 css-loader底层实现了html的代码
var btn = document.createElement("button");
btn.innerHTML = "新增";
document.body.appendChild(btn);

btn.onclick = function () {
  var div = document.createElement("div");
  div.innerHTML = "item";
  document.body.appendChild(div);
};

// import counter from './counter';
// import number from './number';

// counter();
// number();

// vue-loader也内置这样的功能
// react babel-preset也内置了这样的功能
// if(module.hot) {
// 	module.hot.accept('./number', () => {
// 		document.body.removeChild(document.getElementById('number'));
// 		number();
// 	})
// }
