import { Request, Response } from 'express';
import _ from 'lodash';
import Topic from '../models/topics';

/**
 * List
 */
export async function all(req: Request, res: Response) {
  try {
    const topics = await Topic.find({}).exec();
    return res.json(topics);
  } catch (err) {
    console.log('Error in first query');
    return res.status(500).send('Something went wrong getting the data');
  }
}

/**
 * Add a Topic
 */
export async function add(req: Request, res: Response) {
  try {
    await Topic.create(req.body);
    return res.status(200).send('OK');
  } catch (err) {
    console.log('Error in create query');
    return res.status(500).send('Something went wrong adding the topic');
  }
}

/**
 * Update a topic
 */
export async function update(req: Request, res: Response) {
  try {
    const query = { id: req.params.id };
    const {isIncrement} = req.body;
    const {isFull} = req.body;
    const omitKeys = ['id', '_id', '_v', 'isIncrement', 'isFull'];
    const data = _.omit(req.body, omitKeys);

    if (isFull) {
      await Topic.findOneAndUpdate(query, data).exec();
    } else {
      await Topic.findOneAndUpdate(query, { $inc: { count: isIncrement ? 1 : -1 } }).exec();
    }
    return res.status(200).send('Updated successfully');
  } catch (err) {
    console.log('Error on save!');
    return res.status(500).send('We failed to save for some reason');
  }
}

/**
 * Remove a topic
 */
export async function remove(req: Request, res: Response) {
  try {
    const query = { id: req.params.id };
    await Topic.findOneAndRemove(query).exec();
    return res.status(200).send('Removed Successfully');
  } catch (err) {
    console.log('Error on delete');
    return res.status(500).send('We failed to delete for some reason');
  }
}

export default {
  all,
  add,
  update,
  remove
};
