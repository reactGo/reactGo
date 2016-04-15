import appConfig from '../config/appConfig';

module.exports = (featureName) =>
  `Attempted to use '${featureName}' but DB type '${appConfig.DB_TYPE}' doesn't support it`;
