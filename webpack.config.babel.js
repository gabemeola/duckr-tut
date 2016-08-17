import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const LAUNCH_COMMAND = process.env.npm_lifecycle_event;
const isProduction = LAUNCH_COMMAND === 'production';
process.env.BABEL_ENV = LAUNCH_COMMAND;

const productionPlugin = new webpack.DefinePlugin({
	'process.env': {
		NODE_ENV: JSON.stringify('production')
	}
});

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'dist')
};

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
});

const base = {
	resolve: {
		extensions: ["", ".js", ".jsx"]
	},
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
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?sourceMap'
			}
		]
	},
};

const developmentConfig = {
	devtool: 'cheap-module-inline-source-map',
	devServer: {
		contentBase: PATHS.build,
		inline: true,
		hot: true,
		progress: true,
		port: 3333
	},
	plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
};

const productionConfig = {
	devtool: 'cheap-module-source-map',
	plugins: [HtmlWebpackPluginConfig, productionPlugin]
};

export default Object.assign({}, base,
	isProduction === true ? productionConfig : developmentConfig
)