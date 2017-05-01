const createStaticAssets = __PRODUCTION__ ? require('./prod') : require('./dev');

export default createStaticAssets;

