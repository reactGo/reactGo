var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

// Other oauthtypes to be added
// TODO: add migration and has_many relation for tokens
// TODO: add google field
// TODO: deserialize some properties into profile object

var User = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    gender: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    location: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    website: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    picture: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    resetPasswordToken: {
      type: DataTypes.STRING
    },
    resetPasswordExpires: {
      type: DataTypes.DATE
    }
  }, {
    timestamps: false,
    
    instanceMethods: {
      comparePassword: function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
          if(err) return cb(err);
          cb(null, isMatch);
        });
      }
    }
  });
};

function encryptAndHashPassword(next) {
  var user = this;
  if (!user.changed('password')) return next();
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
}

User.beforeCreate(encryptAndHashPassword);
User.beforeUpdate(encryptAndHashPassword);

module.exports = User;
