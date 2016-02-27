var Sequelize = require('sequelize');
var secrets = require('./secrets');
var options = {
  dialect: 'postgres'
};
var sequelize;
/*
 * Refer to http://sequelize.readthedocs.org/en/latest/api/sequelize/ for the sequelize API
 * The entry point to sequelize is by importing 
 *    var Sequelize = require('sequelize');
 *    new Sequelize(database, [username=null], [password=null], [options={}]);
 * In addition to sequelize, the connection library for the dialect you want to use should also
 * be installed in your project. You don't need to import it however, as sequelize will take care of that.
 */


// If postgres.uri exists, we are on Heroku!
// Otherwise on a local dev branch, we can create a database with database name and username
if(secrets.db.postgres.uri) {
  // Instantiate sequelize with uri
  // Sequelize will setup a connection pool on initialization so you should ideally
  // only ever create one instance per application.
  sequelize = new Sequelize(secrets.db.postgres.uri, options);
} else {
  // We can't use the same uri logic if the database does not already exist in your local env.
  // To make this easier for local devs without additional work with pgAdmin or pg shell, we'll
  // do it this way
  sequelize = new Sequelize(secrets.db.postgres.name,
                            secrets.db.postgres.username,
                            secrets.db.postgres.password,
                            options);
}

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Successfully connected to postgres');
  }, function (err) {
    console.log('Unable to connect to the postgres database:', err);
  });

module.exports = sequelize;
