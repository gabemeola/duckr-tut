var path = require('path'),
	  webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

var PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'dist')
};


var base = {
	entry: [
		PATHS.app
	],
	output: {
		path: PATHS.build,
		filename: 'index_bundle.js'
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
};

var developmentConfig = {};

var productionConfig = {};

module.exports = {
	resolve: {
		extensions: ["", ".js", ".jsx"]
	},
	devtool: 'eval-source-map',
	devServer: { //Allows webpack-dev-server to be live reloaded
		inline: true,
		hot: false,
		port: 3333
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + '/app/index.html',
			filename: 'index.html',
			inject: 'body'
		})
	]
};