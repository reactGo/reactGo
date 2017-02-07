const path = require('path');
const webpack = require('webpack');
const ManifestPlugin  = require('webpack-manifest-plugin');

const basePath = path.join(process.cwd(), 'public/vendor');

module.exports = {
    entry: {
        core: [
            'lodash',
            'core-js',
            'history',
            'redux'
        ],
        react: [
            'react',
            'react-dom',
            'react-helmet',
            'react-redux',
            'react-router',
            'react-router-redux',
            'react-transform-hmr'
        ]
    },

    output: {
        filename: '[name].[chunkhash].js',
        path: basePath,

        // The name of the global variable which the library's
        // require() function will be assigned to
        library: '[name]_lib',
    },

    plugins: [
        new ManifestPlugin({
            fileName: 'manifest.json',
            stripSrc: true
        }),

        new webpack.DllPlugin({
            // The path to the manifest file which maps between
            // modules included in a bundle and the internal IDs
            // within that bundle
            path: path.join(basePath, '[name]-manifest.json'),
            // The name of the global variable which the library's
            // require function has been assigned to. This must match the
            // output.library option above
            name: '[name]_lib'
        })
    ]
};