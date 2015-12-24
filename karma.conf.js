var path = require('path');
var webpack = require('webpack');

module.exports = function(config) {
  config.set({
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome'],

    frameworks: ['mocha'],

    // Point karma at the tests.webpack.js
    files: [
      'tests.webpack.js'
    ],

    // Run karma through preprocessor plugins
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    webpack: {
      devtool: 'inline-source-map',
      context: path.join(__dirname, "app"),
      module: {
        loaders: [
          {
            test: /\.js$|\.jsx$/,
            exclude: [
              path.resolve('node_modules/')
            ],
            include: path.join(__dirname, "app"),
            loader: 'babel'
          }
        ],
      },
      resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: [
          'app', 'node_modules'
        ]
      },
      node: {
        fs: "empty"
      }
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['dots'],

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,
  });
};