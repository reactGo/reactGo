import { DB_TYPE } from '../../config/env';

export default featureName =>
  `Attempted to use '${featureName}' but DB type '${DB_TYPE}' doesn't support it`;
