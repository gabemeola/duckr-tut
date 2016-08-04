var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	resolve: {
		extensions: ["", ".js", ".jsx"]
	},
	entry: [
		'./app/app.js'
	],
	output: {
		path: __dirname + '/dist',
		filename: 'index_bundle.js'
	},
	devtool: 'eval-source-map',
	devServer: { //Allows webpack-dev-server to be live reloaded
		inline: true,
		hot: false,
		port: 3333
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader?presets[]=es2015,presets[]=react'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?sourceMap'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + '/app/index.html',
			filename: 'index.html',
			inject: 'body'
		})
	]
};