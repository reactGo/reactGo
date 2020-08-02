import { Request, Response } from 'express';
import _ from 'lodash';
import Sequelize from 'sequelize';

import { Models } from '../models';

const {Topic} = Models;

/**
 * List
 */
export function all(req: Request, res: Response) {
  Topic.findAll().then((topics) => {
    res.json(topics);
  }).catch((err: Error) => {
    console.log(err);
    res.status(500).send('Error in first query');
  });
}

/**
 * Add a Topic
 */
export function add(req: Request, res: Response) {
  Topic.create(req.body).then(() => {
    res.status(200).send('OK');
  }).catch((err: Error) => {
    console.log(err);
    res.status(400).send(err);
  });
}

/**
 * Update a topic
 */
export function update(req: Request, res: Response) {
  const query = { id: req.params.id };
  const {isIncrement} = req.body;
  const {isFull} = req.body;
  const omitKeys = ['id', '_id', '_v', 'isIncrement', 'isFull'];
  const data = _.omit(req.body, omitKeys);

  if (isFull) {
    Topic.update(data, { where: query }).then(() => {
      res.status(200).send('Updated successfully');
    }).catch((err) => {
      console.log(err);
      res.status(500).send('We failed to save for some reason');
    });
  } else {
    const sign = isIncrement ? '+' : '-';
    Topic.update({
      count: Sequelize.literal(`count${sign}1`)
    }, { where: query }).then(() => {
      res.status(200).send('Updated successfully');
    }).catch((err) => {
      console.log(err);
      // Not sure if server status is the correct status to return
      res.status(500).send('We failed to save for some reason');
    });
  }
}

/**
 * Remove a topic
 */
export function remove(req: Request, res: Response) {
  Topic.destroy({ where: { id: req.params.id } }).then(() => {
    res.status(200).send('Removed Successfully');
  }).catch((err) => {
    console.log(err);
    res.status(500).send('We failed to delete for some reason');
  });
}

export default {
  all,
  add,
  update,
  remove
};
