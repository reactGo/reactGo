/**
 * webpack.config.js
 *
 * process.env.NODE_ENV is used to determine to return production config or not (an array with both browser and server config)
 * if not, env is used to determine to return browser-rendering config (for hot module replacement) or server-side rendering config (for node)
 * env is a string passed by "webpack --env" on command line or calling this function directly
 * if env contains substring 'browser', then returns browser-rendering config, otherwise server-rendering config
 *
 * NOTE: browser/server is client/server-side rendering respectively in universal/isomorphic javascript
 *
 */
const fs = require('fs');
const PATHS = require('./paths');
const image = require('./rules/image');
const javascript = require('./rules/javascript');
const css = require('./rules/css');
const plugins = require('./plugins');
const externals = require('./externals');
const resolve = require('./resolve');

module.exports = (env = '') => {
  const isProd = process.env.NODE_ENV === 'production';
  const browserRender = (env.indexOf('browser') >= 0);
  console.log(`running webpack.config.js: isProd=${isProd}; browserRender=${browserRender};`);

  const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

  /*
   * PRODUCTION WEBPACK CONFIG
   */
  const prodServerRender = {
    devtool: 'source-map',
    context: PATHS.app,
    entry: { server: '../server/index' },
    target: 'node',
    node: { __dirname: true, __filename: true },
    externals,
    output: {
      path: PATHS.compiled,
      filename: '[name].js',
      publicPath: PATHS.public,
      libraryTarget: 'commonjs2'
    },
    module: {
      rules:
        [
          javascript({
            production: isProd,
            browser: false
          }),
          css({
            production: isProd,
            browser: false
          }),
          image()
      ]
    },
    resolve,
    plugins: plugins({ production: true, browser: false })
  };
  const prodBrowserRender = {
    devtool: 'cheap-module-source-map',
    context: PATHS.app,
    entry: { app: ['./client'] },
    node: { __dirname: true, __filename: true },
    output: {
      path: PATHS.assets,
      filename: '[name].js', // filename: '[name].[hash:6].js',
      chunkFilename: '[name].[chunkhash:6].js', // for code splitting. will work without but useful to set
      publicPath: PATHS.public
    },
    module: {
      rules:
        [
          javascript({
            production: isProd,
            browser: true
          }),
          css({
            production: isProd,
            browser: true
          }),
          image()
        ]
    },
    resolve,
    plugins: plugins({ production: true, browser: true })
  };


  /*
   * DEVELOPMENT WEBPACK CONFIG
   */
  const devBrowserRender = {
    devtool: 'eval',
    context: PATHS.app,
    entry: { app: ['./client', hotMiddlewareScript] },
    node: { __dirname: true, __filename: true },
    output: {
      path: PATHS.assets,
      filename: '[name].js',
      publicPath: PATHS.public
    },
    module: {
      rules:
        [
          javascript({
            production: isProd,
            browser: true
          }),
          css({
            production: isProd,
            browser: true
          }),
          image()
        ]
    },
    resolve,
    plugins: plugins({ production: false, browser: true })
  };

  const devServerRender = {
    devtool: 'sourcemap',
    context: PATHS.app,
    entry: { server: '../server/index' },
    target: 'node',
    node: { __dirname: true, __filename: true },
    externals,
    output: {
      path: PATHS.compiled,
      filename: '[name].dev.js',
      publicPath: PATHS.public,
      libraryTarget: 'commonjs2',
    },
    module: {
      rules:
        [
          javascript({
            production: isProd,
            browser: false
          }),
          css({
            production: isProd,
            browser: false
          }),
          image()
        ]
    },
    resolve,
    plugins: plugins({ production: false, browser: false })
  };

  const prodConfig = [prodBrowserRender, prodServerRender];
  const devConfig = browserRender ? devBrowserRender : devServerRender;
  const configuration = isProd ? prodConfig : devConfig;

  // console.log('%o', configuration);
  return configuration;
};
