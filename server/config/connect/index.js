var DB_TYPES = require('../constants').DB_TYPES;

module.exports = {
  [DB_TYPES.MONGO]: require('./mongo'),
  [DB_TYPES.NONE]: function(){}
};

