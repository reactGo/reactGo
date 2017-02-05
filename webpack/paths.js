const path = require('path');

/**
 * __dirname is changed after webpack-ed to another directory
 * so process.cwd() is used instead to determine the correct base directory
 */
const __DIR__ = process.cwd();

module.exports = {
  app: path.resolve(__DIR__, 'app'),
  assets: path.resolve(__DIR__, 'public', 'assets'),
  compiled: path.resolve(__DIR__, 'compiled'),
  public: '/assets/', // use absolute path for css-loader?
  modules: path.resolve(__DIR__, 'node_modules')
};

