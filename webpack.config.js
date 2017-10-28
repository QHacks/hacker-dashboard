var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

/**
 * Select vendor librarys to be apart of code split.
 * Taking advantage of browser caching system here.
 * @type {Array}
 */
const VENDOR_LIBS = [
	'react',
	'react-redux',
	'redux',
	'redux-form'
];

/**
 * Webpack configuation object.
 * @type {Object}
 */
module.exports = {
  entry: {
		bundle: './client/index.js',
		vendor: VENDOR_LIBS
	},
  output: {
    path: path.join(__dirname, './client/bundle'),
    filename: '[name].[chunkhash].js'
  },
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/
			},
			{
				use: ['style-loader', 'css-loader', "sass-loader"],
				test: /\.scss$/
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest']
		}),
		new HtmlWebpackPlugin({
			template: 'client/index.html'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	]
};
