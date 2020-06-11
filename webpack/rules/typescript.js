const PATHS = require('../paths');

module.exports = ({ production = false } = {}) => {
  return {
    test: /\.ts$|\.tsx$/,
    loader: 'awesome-typescript-loader',
    exclude: PATHS.modules,
  };
};

