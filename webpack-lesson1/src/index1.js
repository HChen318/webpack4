// part1
// var Header = require("./dom/header.js");
// var Sidebar = require("./dom/sidebar.js");
// var Content = require("./dom/content.js");

// new Header();
// new Sidebar();
// new Content();

// part2
import avatar from "./test.png";
import style from "./index1.scss"; // 模块化打包
console.log("avatar", avatar);

var img = new Image();
img.src = avatar;
img.classList.add(style.avatar);
document.getElementById("root").append(img);
