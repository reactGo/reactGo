import PATHS from '../paths';

export default ({
                  production = false, browser = false,
                }) => {
  if (production) {
    if (browser) {
      return {
        test: /\.[tj]sx?$/,
        loader: 'babel-loader',
        exclude: PATHS.modules,
        options: {
          'presets': [
            '@babel/preset-env',
            '@babel/preset-react',
            ['@babel/preset-typescript', {
              'isTSX': true,
              'allExtensions': true,
            }],
          ],
          'plugins': [
            '@babel/plugin-proposal-class-properties',
          ],
        },
      };
    } else {
      return {
        test: /\.[tj]sx?$/,
        loader: 'babel-loader',
        exclude: PATHS.modules,
        options: {
          'presets': [
            ['@babel/preset-env', { targets: { node: 'current' } }],
            '@babel/preset-react',
            ['@babel/preset-typescript', {
              'isTSX': true,
              'allExtensions': true,
            }],
          ],
          'plugins': [
            '@babel/plugin-proposal-class-properties',
          ],
        },
      };
    }
  } else {
    if (browser) {
      return {
        test: /\.[tj]sx?$/,
        loader: 'babel-loader',
        exclude: PATHS.modules,
      };
    } else {
      return {
        test: /\.[tj]sx?$/,
        loader: 'babel-loader',
        exclude: PATHS.modules,
        options: {
          'presets': [
            ['@babel/preset-env', { targets: { node: 'current' } }],
            '@babel/preset-react',
            ['@babel/preset-typescript', {
              'isTSX': true,
              'allExtensions': true,
            }],
          ],
          'plugins': [
            '@emotion',
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties',
          ],
        },
      };
    }
  }
};

