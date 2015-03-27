var path = require("path");
var webpack = require("webpack");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var commonLoaders = [
    { test: /\.js$/, loader: "jsx-loader?harmony" },
    { test: /\.png$/, loader: "url-loader" },
    { test: /\.jpg$/, loader: "file-loader" },
    { test: /\.css$/, loader: "style!css" },
    { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded&" +
    "includePaths[]=" +
    (path.resolve(__dirname, "./bower_components")) + "&" +
    "includePaths[]=" +
    (path.resolve(__dirname, "./node_modules"))}
];

var assetsPath = path.join(__dirname, "public", "assets");
var publicPath = "assets/";

module.exports = {
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
        app: "./app/App.react.js",
        vendor: ['jquery', 'lodash', 'react']
    },
    output: {
        // The output directory as absolute path
        path: assetsPath,
        // The filename of the entry chunk as relative path inside the output.path directory
        filename: "[name].js",
        // The output path from the view of the Javascript
        publicPath: publicPath

    },
    plugins: [
        new CommonsChunkPlugin(/* chunkName= */"vendor", /* fileName= */"vendor.bundle.js")
    ],
    module: {
        loaders: commonLoaders
    }
};