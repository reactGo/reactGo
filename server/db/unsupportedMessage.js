import { DB_TYPE } from '../config/appConfig';

export default (featureName) =>
  `Attempted to use '${featureName}' but DB type '${DB_TYPE}' doesn't support it`;
