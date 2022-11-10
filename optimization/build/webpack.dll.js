const path = require('path');
const webpack = require('webpack');

// webpack提高打包速度，可以通过dll plugin
// 如果不使用这个插件，当引入第三方模块的时候，每次引入都要对模块进行分析消耗性能 打包速度比较慢
// 第一次打包的时候把第三方文件单独打包生成一个文件，放到dll管理，下次打包更快
// 1.生成dll.js第三方模块文件
// 2.DllPlugin 生成manifest.json映射文件
// 3.挂载dll.js文件
// 4.使用DllReferencePlugin引入映射文件,如果源代码里有第三方模块会在dll目录里找，直接在dll文件里找，提高打包速度

module.exports = {
	mode: 'production',
	entry: {
		vendors: ['lodash'],
		react: ['react', 'react-dom'],
	},
	output: {
		filename: '[name].dll.js',
		path: path.resolve(__dirname, '../dll'),
		library: '[name]'
	},
	plugins: [
		new webpack.DllPlugin({
			name: '[name]',
			path: path.resolve(__dirname, '../dll/[name].manifest.json'),
		})
	]
}