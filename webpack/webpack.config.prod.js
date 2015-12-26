var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

var assetsPath = path.join(__dirname, "..", "public", "assets");
var publicPath = "assets/";

var commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$/,
    loaders: ['babel'],
    include: path.join(__dirname, "..",  "app")
  },
  { test: /\.json$/, loader: "json-loader" },
  { test: /\.png$/, loader: "url-loader" },
  { test: /\.jpg$/, loader: "file-loader" },
  { test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module&localIdentName=[local]__[hash:base64:5]!autoprefixer-loader!sass?includePaths[]=' 
      + encodeURIComponent(path.resolve(__dirname, '..', 'app', 'scss')))
  }
];

module.exports = [
  {
    // The configuration for the client
    name: "browser",
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
    // A SourceMap is emitted.
    devtool: "source-map",
    context: path.join(__dirname, "..", "app"),
    entry: {
      app: "./client"
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
      preLoaders: [{
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loaders: ["eslint"]
      }],
      loaders: commonLoaders
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss'],
      modulesDirectories: [
        "app", "node_modules"
      ]
    },
    plugins: [
        // Order the modules and chunks by occurrence.
        // This saves space, because often referenced modules
        // and chunks get smaller ids.
        new webpack.optimize.OccurenceOrderPlugin(),
        // extract inline css from modules into separate files
        new ExtractTextPlugin("styles/main.css"),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          }
        }),
        new webpack.DefinePlugin({
          __TEST__: JSON.stringify(JSON.parse(process.env.TEST_ENV || 'false'))
        })
    ]
  }, {
    // The configuration for the server-side rendering
    name: "server-side rendering",
    context: path.join(__dirname, "..", "app"),
    entry: {
      app: "./server"
    },
    target: "node",
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "[name].server.js",
      // The output path from the view of the Javascript
      publicPath: publicPath,
      libraryTarget: "commonjs2"
    },
    module: {
      loaders: commonLoaders
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss'],
      modulesDirectories: [
        "app", "node_modules"
      ]
    },
    plugins: [
        // Order the modules and chunks by occurrence.
        // This saves space, because often referenced modules
        // and chunks get smaller ids.
        new webpack.optimize.OccurenceOrderPlugin(),
        // extract inline css from modules into separate files
        new ExtractTextPlugin("styles/main.css"),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          }
        }),
        new webpack.DefinePlugin({
          __TEST__: JSON.stringify(JSON.parse(process.env.TEST_ENV || 'false'))
        })
    ]
  }
];
