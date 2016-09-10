var webpack = require('webpack');

var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var precss = require('precss');
var cssimport = require('postcss-import');
var cssnested = require('postcss-nested');
var cssnext = require('postcss-cssnext');

var path = require('path');
var fs = require('fs');

var env = process.env.NODE_ENV || "development";

var nodeModules = {};

module.exports = {
  devtool: 'sourcemap',
  entry: __dirname + '/app/main.js',
  output: {
    path: __dirname + "/app/build",
    filename: 'main.js'
  },
  resolve: {
    alias: {
      // example:
      // 'bootstrap.css': "node_modules/bootstrap/dist/css/bootstrap.css"
    }
  },
  module: {
    loaders: [
       { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'babel' },
       // inline base64 URLs for <=12k images, direct URLs for the rest otherwise serve as file
       { test: /\.(jpg|jpeg|png|gif|svg)$/, loaders: ['url-loader?limit=12288'] },
       { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" }
    ]
  },
  postcss: function () {
    return [cssimport, cssnested, cssnext, precss];
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
    }),
    new BrowserSyncPlugin({
      proxy: 'localhost:5000',
      open: false,
      port: 3003
    }),
  ],
  node: {
    console: true
  },
};
