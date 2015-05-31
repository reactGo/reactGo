var Sequelize = require('sequelize');
var secrets = require('./secrets');

/*
 * Refer to http://sequelize.readthedocs.org/en/latest/api/sequelize/ for the sequelize API
 * The entry point to sequelize is by importing 
 *    var Sequelize = require('sequelize');
 *    new Sequelize(database, [username=null], [password=null], [options={}]);
 * In addition to sequelize, the connection library for the dialect you want to use should also
 * be installed in your project. You don't need to import it however, as sequelize will take care of that.
 */
// Instantiate sequelize with uri
// Sequelize will setup a connection pool on initialization so you should ideally 
// only ever create one instance per application.
var sequelize = new Sequelize(secrets.db.postgres, {
  dialect: 'postgres'
});

module.exports = sequelize;