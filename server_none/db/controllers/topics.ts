import { Request, Response } from 'express';

/**
 * List
 */
export function all(req: Request, res: Response) {
  res.json([]);
}

/**
 * Add a Topic
 */
export function add(req: Request, res: Response) {
  res.send('ok');
}

/**
 * Update a topic
 */
export function update(req: Request, res: Response) {
  res.send('ok');
}

/**
 * Remove a topic
 */
export function remove(req: Request, res: Response) {
  res.send('ok');
}

export default {
  all,
  add,
  update,
  remove
};
