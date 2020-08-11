import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import User from '../models/users';

/**
 * POST /login
 */
export function login(req: Request, res: Response, next: NextFunction) {
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.sendStatus(401);
    }
    if (info) {
      return res.status(401).json(info);
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.sendStatus(401);
      return res.sendStatus(200);
    });
  })(req, res, next);
}

/**
 * POST /logout
 */
export function logout(req: Request, res: Response) {
  req.logout();
  res.sendStatus(200);
}

/**
 * POST /signup
 * Create a new local account
 */
export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.sendStatus(409);
    }
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    return req.logIn(user, (err) => {
      if (err) return res.sendStatus(401);
      return res.sendStatus(200);
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

export default {
  login,
  logout,
  signUp,
};
