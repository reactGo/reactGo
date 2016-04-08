var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var secrets = require('./secrets');
var appConfig = require('./appConfig');
var DB_TYPE = require('./constants').DB_TYPE;

/*
 * This file can be switched out for any database connection you wish
 */
module.exports = function() {

  /*
   * BEGIN DB specific configuration
   */
  if (appConfig.DB_TYPE === DB_TYPE.MONGO) {
    // Find the appropriate database to connect to, default to localhost if not found.
    var connect = function() {
      mongoose.connect(secrets.db, function(err, res) {
        if(err) {
          console.log('Error connecting to: ' + secrets.db + '. ' + err);
        }else {
          console.log('Succeeded connected to: ' + secrets.db);
        }
      });
    };
    connect();

    mongoose.connection.on('error', console.log);
    mongoose.connection.on('disconnected', connect);

    // Register schema as mongoose model

    var modelPath = path.join(__dirname, '..', 'models');
    fs.readdirSync(modelPath).forEach(function(file) {
      if(~file.indexOf('.js')) require(modelPath + '/' + file);
    });
  }
};

