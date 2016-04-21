/* Use this old export style until sequelize cli supports es6 syntax */
function defaultExport() {}

defaultExport.DB_TYPES = {
  MONGO: 'MONGO',
  POSTGRES: 'POSTGRES',
  NONE: 'NONE'
};

module.exports = defaultExport;
