var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');
var webpack = require('webpack');

var assetsPath = path.join(__dirname, '..', 'public', 'assets');
var publicPath = '/assets/';

var commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    // Reason why we put this here instead of babelrc
    // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
    query: {
      presets: ['es2015', 'react', 'stage-0'],
      plugins: [
        'transform-decorators-legacy',
        'transform-react-remove-prop-types',
        'transform-react-constant-elements',
        'transform-react-inline-elements'
      ]
    },
    include: path.join(__dirname, '..', 'app'),
    exclude: path.join(__dirname, '..', 'node_modules')
  },
  { test: /\.json$/, loader: 'json-loader' },
  {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
    loader: 'url',
    query: {
        name: '[hash].[ext]',
        limit: 10000,
    }
  },
  { test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module!postcss-loader')
  }
];

var postCSSConfig = function () {
  return [
    require('postcss-import')(),
    require('postcss-cssnext')({
      browsers: ['> 1%', 'last 2 versions']
    }),
    require('postcss-reporter')({ clearMessages: true })
  ];
};

module.exports = [
  {
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
    // SourceMap without column-mappings
    devtool: 'cheap-module-source-map',
    context: path.join(__dirname, '..', 'app'),
    entry: {
      app: './client'
    },
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: '[name].js',
      // The output path from the view of the Javascript
      publicPath: publicPath

    },

    module: {
      loaders: commonLoaders
    },
    resolve: {
      root: [path.join(__dirname, '..', 'app')],
      extensions: ['', '.js', '.jsx', '.css']
    },
    plugins: [
        // extract inline css from modules into separate files
        new ExtractTextPlugin('styles/main.css', { allChunks: true }),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          }
        }),
        new webpack.DefinePlugin({
          __DEVCLIENT__: false,
          __DEVSERVER__: false
        }),
        new InlineEnviromentVariablesPlugin({ NODE_ENV: 'production' })
    ],
    postcss: postCSSConfig
  }, {
    // The configuration for the server-side rendering
    name: 'server-side rendering',
    context: path.join(__dirname, '..', 'app'),
    entry: {
      server: './server'
    },
    target: 'node',
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: 'server.js',
      // The output path from the view of the Javascript
      publicPath: publicPath,
      libraryTarget: 'commonjs2'
    },
    module: {
      loaders: commonLoaders
    },
    resolve: {
      root: [path.join(__dirname, '..', 'app')],
      extensions: ['', '.js', '.jsx', '.css']
    },
    plugins: [
        // Order the modules and chunks by occurrence.
        // This saves space, because often referenced modules
        // and chunks get smaller ids.
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('styles/main.css', { allChunks: true }),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          }
        }),
        new webpack.DefinePlugin({
          __DEVCLIENT__: false,
          __DEVSERVER__: false
        }),
        new webpack.IgnorePlugin(/vertx/),
        new InlineEnviromentVariablesPlugin({ NODE_ENV: 'production' })
    ],
    postcss: postCSSConfig
  }
];
