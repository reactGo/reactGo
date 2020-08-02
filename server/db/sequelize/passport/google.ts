import { Request } from 'express';
import { sequelize } from '../models';
import User from '../models/users';

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
function attachGoogleAccount(user: User | null, profile: GoogleProfile, accessToken: string, done: DoneFunction) {
  if (user) {
    user.google = profile.id;
    user.name = user.name || profile.displayName;
    user.gender = user.gender || profile._json.gender;
    user.picture = user.picture || profile._json.picture;

    return sequelize.transaction((transaction) => user.save({ transaction }).then(() => user.createToken({
      kind: 'google',
      accessToken,
    }, { transaction }))).then(() => done(null, user, { message: 'Google account has been linked.' }));
  }
  return done(null, user, { message: 'No such user is found' });
}

/* eslint-enable no-param-reassign */

function createUserWithToken(profile: GoogleProfile, accessToken: string, done: DoneFunction) {
  return sequelize.transaction((transaction) => User.create({
    email: profile._json.emails[0].value,
    google: profile.id,
    name: profile.displayName,
    gender: profile._json.gender,
    picture: profile._json.picture,
  }, { transaction }).then((user) => user.createToken({
    kind: 'google',
    accessToken,
  }, { transaction }).then(() => done(null, user))));
}

const existingGoogleAccountMessage = [
  'There is already a Google account that belongs to you.',
  'Sign in with that account or delete it, then link it with your current account.',
].join(' ');

const existingEmailUserMessage = [
  'There is already an account using this email address.',
  'Sign in to that account and link it with Google manually from Account Settings.',
].join(' ');

export default (req: Request, accessToken: string, refreshToken: string, profile: GoogleProfile, done: DoneFunction) => {
  User.findOne({
    where: { google: profile.id },
  }).then((existingUser) => {
    if (req.user) {
      if (existingUser) {
        return done(null, false, { message: existingGoogleAccountMessage });
      }
      return User.findByPk(req.user.id).then((user) => attachGoogleAccount(user, profile, accessToken, done));
    }

    if (existingUser) return done(null, existingUser);

    return User.findOne({
      where: { email: profile._json.emails[0].value },
    }).then((existingEmailUser) => {
      if (existingEmailUser) {
        return done(null, false, { message: existingEmailUserMessage });
      }
      return createUserWithToken(profile, accessToken, done);
    });
  }).catch((err: Error) => {
    console.log(err);
    return done(null, false, { message: 'Something went wrong trying to authenticate' });
  });
};
