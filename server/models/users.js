var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

// Other oauthtypes to be added

function hashPassword(user, options) {
  if (!user.changed('password')) return;
  return bcrypt.genSaltAsync(5)
    .then(function(salt) {
      return bcrypt.hashAsync(user.password, salt, null)
        .then(function(hash) {
          user.password = hash;
        });
    });
}

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING
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
    },
    google: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Token, {
          foreignKey: 'userId'
        });
      }
    },
    
    instanceMethods: {
      comparePassword: function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
          if(err) return cb(err);
          cb(null, isMatch);
        });
      },
      
      toJSON: function() {
        return {
          id: this.id,
          email: this.email,
          profile: {
            name: this.name,
            gender: this.gender,
            location: this.location,
            website: this.website,
            picture: this.picture
          }
        };
      }
    }
  });
  
  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);
  
  return User;
};
