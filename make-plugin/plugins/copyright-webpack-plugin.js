class CopyrightWebpackPlguin {
  apply(compiler) {
    // compiler webpack的一个实例，存储了相关了配置文件等等
    // compiler.hooks

    // 同步时刻
    compiler.hooks.compile.tap("CopyrightWebpackPlugin", (compilation) => {
      console.log("compiler");
    });

    // emit打包资源放到dist目录之前的时刻，异步时刻
    compiler.hooks.emit.tapAsync(
      "CopyrightWebpackPlguin",
      (compilation, cb) => {
        debugger;
        // 打包到dist之前生成copryright.txt
        compilation.assets["copryright.txt"] = {
          source: function () {
            return "copyright by CH";
          },
          size: function () {
            return 14;
          },
        };
        cb();
      }
    );
  }
}

module.exports = CopyrightWebpackPlguin;
