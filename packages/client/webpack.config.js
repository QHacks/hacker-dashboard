require("dotenv").config();

const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const isProd = process.env.NODE_ENV === "production";

const mode = isProd ? "production" : "development";

isProd
  ? console.log("Running production build!")
  : console.log("Running development build!");

const DEV_PROXY = process.env.DEV_PROXY;

const CLIENT_DIR = path.resolve(__dirname, "./");
const CLIENT_ENTRY = path.resolve(CLIENT_DIR, "Client.js");
const CLIENT_TEMPLATE = path.resolve(CLIENT_DIR, "index.html");
const CLIENT_OUTPUT = path.resolve(CLIENT_DIR, "bundle");

const VENDOR_LIBS = ["react"];

module.exports = {
  entry: {
    bundle: CLIENT_ENTRY,
    vendor: VENDOR_LIBS
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: "vendor",
          name: "vendor",
          enforce: true
        }
      }
    }
  },
  mode,
  output: {
    path: CLIENT_OUTPUT,
    publicPath: "/",
    filename: "[name].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
        use: "file-loader?name=[name].[ext]?[hash]"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/fontwoff"
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: !isProd ? "[name].css" : "[name].[hash].css",
      chunkFilename: !isProd ? "[id].css" : "[id].[hash].css"
    }),
    new HtmlWebpackPlugin({
      template: CLIENT_TEMPLATE
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    }),
    new FaviconsWebpackPlugin(
      path.resolve(CLIENT_DIR, "assets/img/qhacks_favicon.png")
    ),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  devServer: {
    historyApiFallback: {
      disableDotRule: true,
      index: "/"
    },
    compress: true,
    proxy: {
      "/api": {
        target: DEV_PROXY,
        changeOrigin: true
      }
    }
  },
  devtool: isProd ? "source-map" : "cheap-eval-source-map"
};
