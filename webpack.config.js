const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv').config();
const winston = require('winston');
const webpack = require('webpack');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

(isProd)
    ? winston.info("Running production build!")
    : winston.info("Running development build!");

const PORT = process.env.PORT;
const DEV_PROXY = process.env.DEV_PROXY || `http://localhost:${PORT}`;

const CLIENT_DIR = path.resolve('client');
const CLIENT_ENTRY = path.resolve('client/Client.js');
const CLIENT_TEMPLATE = path.resolve('client/index.html');
const CLIENT_OUTPUT = path.join(__dirname, './client/bundle');

const ASSETS_DIR = path.resolve('client/assets');
const FONTS_DIR = path.join(ASSETS_DIR, 'fonts');
const MODULE_DIR = path.resolve('node_modules');

const APPLICATIONS_STATUS = (process.env.APPLICATIONS_STATUS && process.env.APPLICATIONS_STATUS.match(/open/i))
    ? 'open'
    : 'closed';

const VENDOR_LIBS = [
    'react',
    'react-redux',
    'redux',
    'redux-form'
];

module.exports = {
    entry: {
        bundle: ['babel-polyfill', CLIENT_ENTRY],
        vendor: VENDOR_LIBS
    },
    output: {
        path: CLIENT_OUTPUT,
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            '../../theme.config$': path.join(__dirname, 'client/assets/semantic-ui/theme.config')
        }
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
                use: 'file-loader?name=[name].[ext]?[hash]'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/fontwoff'
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
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                APPLICATIONS_STATUS: JSON.stringify(APPLICATIONS_STATUS)
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css'
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0
        }),
        new FaviconsWebpackPlugin('./client/assets/img/qhacks_favicon.png'),
        new webpack.optimize.AggressiveMergingPlugin(),
        new UglifyJsPlugin()
    ],
    devServer: {
        historyApiFallback: {
            disableDotRule: true,
            index: '/'
        },
        compress: true,
        proxy: {
            '/api': {
                target: DEV_PROXY,
                changeOrigin: true
            }
        }
    },
    devtool: isProd
        ? 'source-map'
        : 'cheap-eval-source-map'
};
