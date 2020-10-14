const createStaticAssets = process.env.NODE_ENV === 'production' ? require('./prod') : require('./dev');

export default createStaticAssets;
