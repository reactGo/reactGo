import bcrypt from 'bcrypt-nodejs';
import { Model, Sequelize, DataTypes, Transaction } from 'sequelize';
import { dbType } from './index';

// Other oauthtypes to be added

/* eslint-disable no-param-reassign */
function hashPassword(user: User) {
  if (!user.changed('password')) return undefined;
  return bcrypt.genSalt(5, (saltError, salt) => {
    bcrypt.hash(user.password, salt, null, (hashError, hash) => {
      user.password = hash;
    });
  });
}

class User extends Model {
  public id!: number;

  public email!: string;

  public password!: string;

  public name?: string;

  public gender?: string;

  public location?: string;

  public website?: string;

  public picture?: string;

  public google?: string;

  public setTokens!: (option: { kind: string, accessToken: string }, sequelizeOption: { transaction: Transaction }) => Promise<any>

  static initWithSequelize(sequelize: Sequelize) {
    User.init({
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
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false,
    });

    User.beforeCreate(hashPassword);
    User.beforeUpdate(hashPassword);
  }

  static associate(models: dbType) {
    models.User.hasMany(models.Token, {
      foreignKey: 'userId'
    });
  }

  async createToken(option: { kind: string, accessToken: string }, sequelizeOption: { transaction: Transaction }) {
    return this.setTokens(option, sequelizeOption);
  }

  comparePassword(this: User, candidatePassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, this.password, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  toJSON(this: User): any {
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

export default User;
