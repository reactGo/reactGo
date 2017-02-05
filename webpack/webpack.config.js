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
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PATHS = require('./paths');
const image = require('./rules/image');

module.exports = (env = '') => {
  const isProd = process.env.NODE_ENV === 'production';
  const browserRender = (env.indexOf('browser') >= 0);
  console.log(`running webpack.config.js: isProd=${isProd}; browserRender=${browserRender};`);

  const externals = fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .reduce((acc, cur) => Object.assign(acc, { [cur]: 'commonjs ' + cur }), {});

  const babelLoader = (production = false, browser = false) => {
    const obj = {
      test: /\.js$|\.jsx$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-0']
      },
      exclude: PATHS.modules
    };
    if (production) {
      obj.query.plugins = [
        'transform-react-remove-prop-types',
        'transform-react-constant-elements',
        'transform-react-inline-elements'
      ];
    } else if (browser) {
      obj.query.presets.unshift('react-hmre');
    }
    return obj;
  };

  const cssLoader = (production = false, browser = false) => {
    /*
     * https://github.com/webpack/css-loader/issues/59 - use css-loader/locals on server-side rendering
     * :local(.className) used to declare className in the local scope,
     * local identifiers are exported by css-loader
     *
     * modules enable CSS Modules spec https://github.com/css-modules/css-modules
     *
     * importLoaders (int): That many loaders after the css-loader are applied to @import-ed resources.
     *
     */
    const queryModules = 'modules';
    const queryImportLoaders = 'importLoaders=1';
    const queryLocal = 'localIdentName=[name]__[local]___[hash:base64:5]';

    const queryStrExtractTextPlugin = '?' + queryModules + '&' + queryImportLoaders;
    const queryStr = queryStrExtractTextPlugin + '&' + queryLocal;

    const serverSide = 'css-loader/locals' + queryStr + '!postcss-loader';
    const browserSide = 'style-loader!css-loader' + queryStr + '!postcss-loader';

    const myLoader = browser ? browserSide : serverSide;

    const prodBrowserRenderLoader = ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: 'css-loader' + queryStrExtractTextPlugin + '!postcss-loader'
    });
    const loader = production && browser ? prodBrowserRenderLoader : myLoader;
    const obj = { test: /\.css$/, include: PATHS.app, loader };
    return obj;
  };

  const webpackPlugins = (production = false, browser = false) => {
    const bannerOptions = { raw: true, banner: 'require("source-map-support").install();' };
    const compress = { warnings: false };

    if (!production && !browser) {
      return [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.IgnorePlugin(/vertx/),
        new webpack.BannerPlugin(bannerOptions)
      ];
    }
    if (!production && browser) {
      return [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV'])
      ];
    }
    if (production && !browser) {
      return [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.IgnorePlugin(/vertx/),
        new webpack.optimize.UglifyJsPlugin({ compress }),
        new webpack.BannerPlugin(bannerOptions)
      ];
    }
    if (production && browser) {
      const filename = 'styles/main.css';
      const allChunks = true;

      return [
        new ExtractTextPlugin({ filename, allChunks }), // extracted css to css/main.css
        // new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] }),
        new webpack.optimize.UglifyJsPlugin({ compress }),
        new webpack.EnvironmentPlugin(['NODE_ENV'])
      ];
    }
    return [];
  };

  const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

  const resolve = {
    modules: [PATHS.app, PATHS.modules],
    extensions: ['.js', '.jsx', '.css'],
  };

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
    module: { rules: [babelLoader(isProd, false), cssLoader(isProd, false), image()] },
    resolve,
    plugins: webpackPlugins(true, false)
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
    module: { rules: [babelLoader(isProd, true), cssLoader(isProd, true), image()] },
    resolve,
    plugins: webpackPlugins(true, true)
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
    module: { rules: [babelLoader(isProd, true), cssLoader(isProd, true), image()] },
    resolve,
    plugins: webpackPlugins(false, true)
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
    module: { rules: [babelLoader(isProd, false), cssLoader(isProd, false), image()] },
    resolve,
    plugins: webpackPlugins(false, false)
  };

  const prodConfig = [prodBrowserRender, prodServerRender];
  const devConfig = browserRender ? devBrowserRender : devServerRender;
  const configuration = isProd ? prodConfig : devConfig;

  // console.log('%o', configuration);
  return configuration;
};
