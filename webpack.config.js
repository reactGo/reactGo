var path = require("path");
var webpack = require("webpack");

var commonLoaders = [
	{ test: /\.js$/, loader: "jsx-loader" },
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
	// The entry point of the bundle
	entry: {
		app: "./app/app.js",
		vendor: ['jquery', 'lodash', 'react']
	},
	output: {
		// The output directory as absolute path
		path: assetsPath,
		// The filename of the entry chunk as relative path inside the output.path directory
		filename: "bundle.js",
		// The output path from the view of the Javascript
		publicPath: publicPath

	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* fileName= */"vendor.bundle.js")
	],
	module: {
		loaders: commonLoaders
	}
};