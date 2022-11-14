const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core"); // 代码转换

const moduleAnalyser = (filename) => {
  // 读取文件内容
  const content = fs.readFileSync(filename, "utf-8");
  // 代码分析 > 转换js对象 > 抽象语法树
  const ast = parser.parse(content, {
    sourceType: "module",
  });
  const dependencies = {};
  // 通过traverse 分析引入依赖
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(filename);
      // 相对于bundler文件夹的路径
      const newFile = "./" + path.join(dirname, node.source.value);
      dependencies[node.source.value] = newFile;
    },
  });
  // 源代码编译 es6转换浏览器可执行的代码
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });

  return {
    filename,
    dependencies,
    code,
  };
};

const makeDependenciesGraph = (entry) => {
  const entryModule = moduleAnalyser(entry);
  const graphArr = [entryModule];
  for (let i = 0; i < graphArr.length; i++) {
    const { dependencies } = graphArr[i];
    if (dependencies) {
      for (const key in dependencies) {
        graphArr.push(moduleAnalyser(dependencies[key]));
      }
    }
  }
  const graph = {};

  graphArr.forEach((ele) => {
    graph[ele.filename] = {
      dependencies: ele.dependencies,
      code: ele.code,
    };
  });

  return graph;
};

const generateCode = (entry) => {
  const graph = JSON.stringify(makeDependenciesGraph(entry));
  console.log(graph);
  // 1.闭包输出一段字符串代码
  // 2.执行入口文件对应的code代码
  // 3.相对路径转换,返回真实路
  // 4.调用外部的require,递归执行
  return `
    (function(graph) {
        function require(module){
            function localRequire(relativePath) {
                return require(graph[module].dependencies[relativePath]);
            }
            var exports = {};
            (function(require,exports,code){
                eval(code)
            })(localRequire,exports,graph[module].code)
            return exports;
        }
        require('${entry}')
    })(${graph})
  `;
};

const code = generateCode("./src/index.js");
console.log("code", code);
