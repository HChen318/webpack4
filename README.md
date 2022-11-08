# webpack4
webpack4

### lesson1
#### Webpack 的核心（lesson1）
- entry
- output
- loader > 打包静态资源
- plgins 
- SourceMap的配置
- WebpackDevServer 提升开发效率
- Hot Module Replacement 热模块更新
- 使用 Babel 处理 ES6 语法
- Webpack 实现对React框架代码的打包

### lesson2
#### Webpack 的高级
- Tree Shaking
- Develoment 和 Production 模式的区分打包，抽取公共部分
- Code Splitting
  - 1.同步代码： 只需要在webpack.common.js中做optimization的配置
  - 2.异步代码(import)： 无需做任何配置会自动进行代码分割
- SplitChunksPlugin 配置
- Lazy Loading 懒加载，Chunk 是什么
- Preload, Prefetch
    - Preload  和主的代码一起加载
    - Prefetch 等待核心代码加载完后，页面带宽空闲的时候在去加载js
    - 这里总结了一点
       - 一开始加载页面的时候不能仅仅关注与缓存，重点考虑的如果让页面加载js的文件利用率最高，有一些交互之后用到的代码，完全可以放到异步组件里去，通过懒加载的方式把这块逻辑加载进来，这样代码性能就很大提升，页面返回的速度更快，有可能会牺牲用户体验这时候就可以通过Prefetch解决这样的问题。在做前端性能优化的时候，缓存也不是重要的点，最重要的点应该转移的codecoverage上思考
- CSS 文件的代码分割
    - MiniCssExtractPlugin css代码分割
    - OptimizeCSSAssetsPlugin 对css进行合并压缩
- Webpack与浏览器缓存
    - contenthash 内容不变hash不会变，通过contenthash重新打包代码，用户只需要更新变化的代码，没变化可以走缓存，通过配置合理做webpack缓存
- Shimming的作用(垫片) 
- 环境变量的使用方法
    - --env.production(全局变量)



  


