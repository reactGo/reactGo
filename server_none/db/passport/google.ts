import { Request } from 'express';

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

export default (req: Request, accessToken: string, refreshToken: string, profile: GoogleProfile, done: DoneFunction) => {
  done(null, profile);
};
