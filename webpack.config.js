var webpack = require('webpack');

var precss = require('precss');
var autoprefixer = require('autoprefixer');
var cssimport = require('postcss-import');
var cssnested = require('postcss-nested');
var cssnext = require('postcss-cssnext');

var path = require('path');
var fs = require('fs');

var env = process.env.NODE_ENV || "development";

var nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var Module = {};

Module.frontend = {
  devtool: 'sourcemap',
  output: {
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
       { test: /\.html$/, loader: 'raw' },
       // inline base64 URLs for <=12k images, direct URLs for the rest otherwise serve as file
       { test: /\.(jpg|jpeg|png|gif|svg)$/, loaders: ['url-loader?limit=12288'] },
       { test: /\.(eot|woff2|woff|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?(\?iefix)?(#webfont)?$/, loaders: ['file'] },
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
  ],
  node: {
    console: true
  },
};

module.exports = Module;
