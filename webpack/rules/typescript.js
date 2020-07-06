const PATHS = require('../paths');

module.exports = ({ production = false } = {}) => {
  return {
    test: /\.[tj]sx?$/,
    loader: 'babel-loader',
    exclude: PATHS.modules,
  };
};

