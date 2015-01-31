/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/madhums/node-express-mongoose-demo/blob/master/app/models/user.js
 */

var mongoose = require('mongoose');
var crypto = require('crypto');

// Other oauthtypes to be added

/*
 User Schema
*/

var UserSchema = new mongoose.Schema({
	name: { type: String, default: ''},
	email: { type: String, default: ''},
	username: { type: String, default: ''},
	provider: { type: String, default: ''},
	hashed_password: { type: String, default: ''},
	salt: { type: String, default: ''},
	authToken: { type: String, default: ''}
});

/*
 Virtuals
 Virtuals are document properties that you can get and set but that do not get persisted to MongoDB.
 The getters are useful for formatting or combining fields, while settings are useful for de-composing a single value into multiple values for storage.
*/
UserSchema
	.virtual('password')
	.set(function(password) {
		this._password = password;
		this.salt = this.makeSalt();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function() {
		return this._password;
	});

/*
 Defining our own custom document instance method
*/
UserSchema.methods = {
   /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
  *	Encrypt password
  *
  * @param {String} password
  * @return {String}
  *	@api public
  */
  encryptPassword: function (password) {
  	if(!password) return '';
  	try {
  		//Creates and returns a hmac object,
  		// a cryptographic hmac with the given algorithm and key.
  		// hmac is a Class for creating cryptographic hmac content.
  		return crypto
  			.createHmac('sha1', this.salt)
  			.update(password)
  			.digest('hex');
  	} catch(e) {
  		return '';
  	}
  }

};

/**
 * Statics
 */

UserSchema.statics = {

    /**
     * Load
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */

    load: function (options, cb) {
        options.select = options.select || 'name username';
        this.findOne(options.criteria)
            .select(options.select)
            .exec(cb);
    }
}

mongoose.model('User', UserSchema);
