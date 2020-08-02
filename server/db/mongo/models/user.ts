/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

import bcrypt from 'bcrypt-nodejs';
import mongoose, { Document, HookNextFunction } from 'mongoose';

// Other oauthtypes to be added

/*
 User Schema
 */

interface UserDocument extends Document {
  email: string;
  profile: {
    name: string,
    gender: string,
    location: string,
    website: string,
    picture: string,
  }
  password: string;
  google: string;
  tokens: Array<{ kind: string, accessToken: string }>;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
  comparePassword: (candidatePassword: string, cb: (error: Error | null, data?: any) => void) => void;
}

const UserSchema = new mongoose.Schema<UserDocument>({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  tokens: Array,
  profile: {
    name: { type: String, default: '' },
    gender: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    picture: { type: String, default: '' }
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  google: {}
});

function encryptPassword(this: UserDocument, next: HookNextFunction) {
  const user = this;
  if (!user.isModified('password')) return next();
  return bcrypt.genSalt(5, (saltErr, salt) => {
    if (saltErr) return next(saltErr);
    return bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
      if (hashErr) return next(hashErr);
      user.password = hash;
      return next();
    });
  });
}

/**
 * Password hash middleware.
 */
UserSchema.pre('save', encryptPassword);

/*
 Defining our own custom document instance method
 */
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

/**
 * Statics
 */
// UserSchema.statics = {};

export default mongoose.model<UserDocument>('User', UserSchema);
