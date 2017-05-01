/*
 * process.env.NODE_ENV - used to determine whether we generate a production or development bundle
 *
 * webpack --env.browser - used to determine whether to generate a browser or server bundle
 *
 * NOTE: browser/server is client/server-side rendering respectively in universal/isomorphic javascript
 *
 */
const PATHS = require('./paths');
const rules = require('./rules');
const plugins = require('./plugins');
const externals = require('./externals');
const resolve = require('./resolve');

module.exports = (env = {}) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isBrowser = env.browser;
  console.log(`Running webpack in ${process.env.NODE_ENV} mode on ${isBrowser ? 'browser': 'server'}`);

  const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
  const node = { __dirname: true, __filename: true };

  const prodServerRender = {
    devtool: 'source-map',
    context: PATHS.app,
    entry: { server: '../server/index' },
    target: 'node',
    node,
    externals,
    output: {
      path: PATHS.compiled,
      filename: '[name].js',
      publicPath: PATHS.public,
      libraryTarget: 'commonjs2'
    },
    module: { rules: rules({ production: true, browser: false }) },
    resolve,
    plugins: plugins({ production: true, browser: false })
  };

  const prodBrowserRender = {
    devtool: 'cheap-module-source-map',
    context: PATHS.app,
    entry: { app: ['./client'] },
    node,
    output: {
      path: PATHS.assets,
      filename: '[chunkhash].js',
      chunkFilename: '[name].[chunkhash:6].js', // for code splitting. will work without but useful to set
      publicPath: PATHS.public
    },
    module: { rules: rules({ production: true, browser: true }) },
    resolve,
    plugins: plugins({ production: true, browser: true })
  };

  const devBrowserRender = {
    devtool: 'eval',
    context: PATHS.app,
    entry: { app: ['./client', hotMiddlewareScript] },
    node,
    output: {
      path: PATHS.assets,
      filename: '[name].js',
      publicPath: PATHS.public
    },
    module: { rules: rules({ production: false, browser: true }) },
    resolve,
    plugins: plugins({ production: false, browser: true })
  };

  const devServerRender = {
    devtool: 'sourcemap',
    context: PATHS.app,
    entry: { server: '../server/index' },
    target: 'node',
    node,
    externals,
    output: {
      path: PATHS.compiled,
      filename: '[name].dev.js',
      publicPath: PATHS.public,
      libraryTarget: 'commonjs2',
    },
    module: { rules: rules({ production: false, browser: false }) },
    resolve,
    plugins: plugins({ production: false, browser: false })
  };

  const prodConfig = isBrowser ? prodBrowserRender : prodServerRender;
  const devConfig = isBrowser ? devBrowserRender : devServerRender;
  const configuration = isProduction ? prodConfig : devConfig;

  return configuration;
};

