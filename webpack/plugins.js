const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin  = require('webpack-manifest-plugin');
const PATHS = require('./paths');

module.exports = ({ dll = false, production = false, browser = false } = {}) => {
  const bannerOptions = { raw: true, banner: 'require("source-map-support").install();' };
  const compress = { warnings: false };

  if (dll) {
    const dllPlugins = [
        new ManifestPlugin({
            fileName: 'manifest.json',
            // basePath: `${production ? PATHS.productionVendor : PATHS.developmentVendor}/`
        }),

        new webpack.DllPlugin({
            // The path to the manifest file which maps between
            // modules included in a bundle and the internal IDs
            // within that bundle
            path: production ? path.join(PATHS.productionVendor, '[name]-manifest.json') :
                               path.join(PATHS.developmentVendor, '[name]-manifest.json'),
            // The name of the global variable which the library's
            // require function has been assigned to. This must match the
            // output.library option above
            name: '[name]_lib'
        })
      ];
      
      return production ? [new webpack.optimize.UglifyJsPlugin({ compress }), ...dllPlugins] : dllPlugins;
  }
  
  if (!production && !browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.BannerPlugin(bannerOptions)
    ];
  }
  
  if (!production && browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DllReferencePlugin({
        context: '.',
        manifest: require('../public/vendor/dev/core-manifest.json')
      }),
      new webpack.DllReferencePlugin({
        context: '.',
        manifest: require('../public/vendor/dev/react-manifest.json')
      }),
    ];
  }
  
  if (production && !browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.BannerPlugin(bannerOptions),
      new webpack.optimize.UglifyJsPlugin({ compress })
    ];
  }
  
  if (production && browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new ExtractTextPlugin({
        filename: 'styles/main.css',
        allChunks: true
      }),
      new webpack.optimize.UglifyJsPlugin({ compress }),
      new webpack.DllReferencePlugin({
        context: '.',
        manifest: require('../public/vendor/prod/core-manifest.json')
      }),
      new webpack.DllReferencePlugin({
        context: '.',
        manifest: require('../public/vendor/prod/react-manifest.json')
      }),
    ];
  }
  
  return [];
};
