import { Request } from 'express';
import User from '../models/user';

interface GoogleProfile {
  id: string;
  displayName: string;
  _json: {
    gender: string;
    picture: string;
    emails: Array<{ value: string }>
  }
}

type DoneFunction = (err: any, user?: any, info?: { message: string }) => void;

/* eslint-disable no-param-reassign */
export default (req: Request, accessToken: string, refreshToken: string, profile: GoogleProfile, done: DoneFunction) => {
  if (req.user) {
    return User.findOne({ google: profile.id }, (findOneErr, existingUser) => {
      if (existingUser) {
        return done(null, false, { message: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
      }
      return User.findById(req.user.id, (findByIdErr, user) => {
        if (user) {
          user.google = profile.id;
          user.tokens.push({ kind: 'google', accessToken });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || profile._json.picture;
          return user.save((err) => {
            done(err, user, { message: 'Google account has been linked.' });
          });
        }
        return done(null, null, { message: 'No such user.' });
      });
    });
  }
  return User.findOne({ google: profile.id }, (findByGoogleIdErr, existingUser) => {
    if (existingUser) return done(null, existingUser);
    return User.findOne({ email: profile._json.emails[0].value }, (findByEmailErr, existingEmailUser) => {
      if (existingEmailUser) {
        return done(null, false, { message: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
      }
      const user = new User();
      user.email = profile._json.emails[0].value;
      user.google = profile.id;
      user.tokens.push({ kind: 'google', accessToken });
      user.profile.name = profile.displayName;
      user.profile.gender = profile._json.gender;
      user.profile.picture = profile._json.picture;
      return user.save((err) => {
        done(err, user);
      });
    });
  });
};
/* eslint-enable no-param-reassign */
