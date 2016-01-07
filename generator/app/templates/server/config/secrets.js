/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/

module.exports = {
  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',
  // ...
  // db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/ReactWebpackNode'
};
