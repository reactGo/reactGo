import { DB_TYPE } from '../../config/app';

export default (featureName) =>
  `Attempted to use '${featureName}' but DB type '${DB_TYPE}' doesn't support it`;
