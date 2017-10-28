const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const winston = require('winston');
const webpack = require('webpack');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

(isProd) ? winston.info("Running production build!") : winston.info("Running development build!");

const CLIENT_DIR = path.resolve('client');
const CLIENT_ENTRY = path.resolve('client/index.js');
const CLIENT_OUTPUT = path.join(__dirname, './client/bundle');
const CLIENT_TEMPLATE = path.resolve('client/index.html');

const ASSETS_DIR = path.resolve('client/assets');
const FONTS_DIR = path.join(ASSETS_DIR, 'fonts');
const MODULE_DIR = path.resolve('node_modules');

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
		bundle: ['babel-polyfill', CLIENT_ENTRY],
		vendor: VENDOR_LIBS
	},
	output: {
		path: CLIENT_OUTPUT,
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
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: {
					loader: isProd ? 'file-loader' : 'url-loader',
					options: {
						name: 'fonts/[name].[ext]'
					}
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest']
		}),
		new HtmlWebpackPlugin({
			template: CLIENT_TEMPLATE
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		new ExtractTextPlugin('styles.css')
	]
};
