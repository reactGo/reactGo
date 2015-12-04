var path = require('path');
var webpack = require('webpack');

var assetsPath = path.join(__dirname, '..', 'public', 'assets');
var publicPath = 'assets/';

var WEBPACK_HOST = 'localhost';
var WEBPACK_PORT = 3001;

var commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$/,
    loaders: ['babel'],
    include: path.join(__dirname, '..', 'app')
  },
  { test: /\.png$/, loader: 'url-loader' },
  { test: /\.jpg$/, loader: 'file-loader' },
  { test: /\.html$/, loader: 'html-loader' }
];

module.exports = [
  {
    // eval - Each module is executed with eval and //@ sourceURL.
    devtool: 'eval',
    // The configuration for the client
    name: 'browser',
    /* The entry point of the bundle
     * Entry points for multi page app could be more complex
     * A good example of entry points would be:
     * entry: {
     *   pageA: "./pageA",
     *   pageB: "./pageB",
     *   pageC: "./pageC",
     *   adminPageA: "./adminPageA",
     *   adminPageB: "./adminPageB",
     *   adminPageC: "./adminPageC"
     * }
     *
     * We can then proceed to optimize what are the common chunks
     * plugins: [
     *  new CommonsChunkPlugin("admin-commons.js", ["adminPageA", "adminPageB"]),
     *  new CommonsChunkPlugin("common.js", ["pageA", "pageB", "admin-commons.js"], 2),
     *  new CommonsChunkPlugin("c-commons.js", ["pageC", "adminPageC"]);
     * ]
     */
    context: path.join(__dirname, '..', 'app'),
    entry: {
      app:[ 'webpack-hot-middleware/client',
        './client' ]
    },
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "[name].js",
      // The output path from the view of the Javascript
      publicPath: publicPath

    },
    module: {
      loaders: commonLoaders.concat([
          { test: /\.scss$/,
            loader: 'style!css?module&localIdentName=[local]__[hash:base64:5]' +
              '&sourceMap!sass?sourceMap&outputStyle=expanded' +
              '&includePaths[]=' + (path.resolve(__dirname, '../node_modules'))
          }
      ])
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss'],
      modulesDirectories: [
        'app', 'node_modules'
      ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
  }, {
    // eval - Each module is executed with eval and //@ sourceURL.
    devtool: 'eval',
    // The configuration for the server-side rendering
    name: 'server-side rendering',
    context: path.join(__dirname, '..', 'app'),
    entry: {
      app: './server'
    },
    target: 'node',
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: '[name].server.js',
      // The output path from the view of the Javascript
      publicPath: publicPath,
      libraryTarget: 'commonjs2'
    },
    externals: /^[a-z\-0-9]+$/,
    module: {
      loaders: commonLoaders.concat([
          { test: /\.scss$/,
            loader: 'css/locals?module&localIdentName=[local]__[hash:base64:5]' +
              '&sourceMap!sass?sourceMap&outputStyle=expanded' +
              '&includePaths[]=' + (path.resolve(__dirname, '../node_modules'))
          }
      ])
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss'],
      modulesDirectories: [
        'app', 'node_modules'
      ]
    }
  }
];
