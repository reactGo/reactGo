import PATHS from '../paths';

export default ({ production = false } = {}) => {
  return {
    test: /\.[tj]sx?$/,
    loader: 'babel-loader',
    exclude: PATHS.modules,
  };
};

