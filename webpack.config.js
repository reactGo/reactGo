var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var commonLoaders = [
  { test: /(\.js$|\.jsx$)/, loader: "jsx-loader?harmony" },
  { test: /\.png$/, loader: "url-loader" },
  { test: /\.jpg$/, loader: "file-loader" }
];

var assetsPath = path.join(__dirname, "public", "assets");
var publicPath = "assets/";

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
    entry: {
      app: "./app/app.js"
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
        { test: /\.css$/, loader: "style!css" },
        { test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap&outputStyle=expanded' +
            '&includePaths[]=' + (path.resolve(__dirname, './bower_components')) +
            '&includePaths[]=' + (path.resolve(__dirname, './node_modules')))
        }
      ])
    },
    plugins: [
        // extract inline css from modules into separate files
        new ExtractTextPlugin('styles/main.css')
    ]
  }, {
    // The configuration for the server-side rendering
    name: "server-side rendering",
    entry: {
      app: "./app/app.js"
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
    externals: /^[a-z\-0-9]+$/,
    module: {
      loaders: commonLoaders
    }
  }
];
