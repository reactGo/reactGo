import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import PATHS from '../paths';

export default ({ production = false, browser = false } = {}) => {
  /*
   * modules: boolean - Enable/Disable CSS Modules
   * importLoaders: number - Number of loaders applied before CSS loader
   *
   * Read more about css-loader options
   * https://webpack.js.org/loaders/css-loader/#options
   *
   * For server-side rendering we use css-loader/locals as we do not want to
   * embed CSS. However, we still require the mappings to insert as className in
   * our views.
   *
   * Referenced from: https://github.com/webpack-contrib/css-loader#css-scope
   *
   * For prerendering with mini-css-extract-plugin you should use
   * css-loader/locals instead of style-loader!css-loader in the prerendering bundle.
   * It doesn't embed CSS but only exports the identifier mappings.
   */
  const localIdentName = '[name]__[local]___[hash:base64:5]';

  const createCssLoaders = (embedCssInBundle: boolean) => ([
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        modules: {
          localIdentName,
        },
        importLoaders: 1,
        onlyLocals: !embedCssInBundle,
      }
    },
  ]);

  const createBrowserLoaders = (extractCssToFile: boolean) => (loaders: any[]) => {
    if (extractCssToFile) {
      return [ MiniCssExtractPlugin.loader, ...loaders];
    }
    return [{ loader: 'style-loader' }, ...loaders];
  };

  const serverLoaders = createCssLoaders(false);
  const browserLoaders = createBrowserLoaders(production)(createCssLoaders(true));

  return {
    test: /\.css$/,
    use: browser ? browserLoaders : serverLoaders,
    include: PATHS.app
  };
};

