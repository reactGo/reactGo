/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

import * as bcrypt from 'bcryptjs';
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

async function encryptPassword(this: UserDocument, next: HookNextFunction) {
  const user = this;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(5);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  return user;
}

/**
 * Password hash middleware.
 */
UserSchema.pre('save', encryptPassword);

/*
 Defining our own custom document instance method
 */
UserSchema.methods.comparePassword = function comparePassword(this: UserDocument, candidatePassword, cb) {
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
