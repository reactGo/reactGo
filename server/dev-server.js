/* 
 Modified from:
 http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup 
*/
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var path = require('path');
var fs = require('fs');

var webpackConfig = require('../webpack/webpack-hot-dev-server.config.js');

module.exports = function() {
  // Fire up webpack and pass in the configuration file we created
  var bundleStart = null;
  var compiler = webpack(webpackConfig);

  // Give notice to the terminal when it starts bundling 
  // and set the time it started
  compiler.plugin('compile', function() {
    console.log('Bundling ...');
    bundleStart = Date.now();
  });

  // Give notice when it is done compiling, including the time it took.
  compiler.plugin('done', function() {
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  });

  var bundler = new webpackDevServer(compiler, {
    // Tell webpack to serve our bundled application from the build path. When proxying:
    // http://localhost:3000/assets -> http://localhost:3001/assets
    publicPath: '/assets/',

    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point
    // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.
    hot: true,

    // webpack-dev-middleware options
    quiet: false,
    noInfo: false,

    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Headers": "X-Requested-With"
    },
    stats: { colors: true },

    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true
  });

  // We fire up the development server and give notice in the terminal
  // that we are starting the initial bundle
  bundler.listen(3001, 'localhost', function () {
    console.log('Bundling project, please wait...');
  });
};