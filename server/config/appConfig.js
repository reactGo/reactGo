function defaultExport() {}

defaultExport.ENV = process.env.NODE_ENV || 'development';

module.exports = defaultExport;
