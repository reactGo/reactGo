var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var secrets = require('../../config/secrets');

module.exports = function() {
  return new MongoStore(
    {
      url: secrets.db,
      autoReconnect: true
    }
  );
};

