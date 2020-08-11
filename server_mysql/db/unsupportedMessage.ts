import { DB_TYPE } from '../../config/serverEnv';

export default (featureName: string) => `Attempted to use '${featureName}' but DB type '${DB_TYPE}' doesn't support it`;
