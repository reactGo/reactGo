import _ from 'lodash';
import Topic from '../models/topics';

/**
 * List
 */
export function all(req, res) {
  Topic.find({}).exec((err, topics) => {
    if (err) {
      console.log('Error in first query');
      return res.sendStatus(500);
    }

    return res.json(topics);
  });
}

/**
 * Add a Topic
 */
export function add(req, res) {
  Topic.create(req.body, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    return res.status(data);
  });
}

/**
 * Update a topic
 */
export function update(req, res) {
  const { isIncrement, isFull } = req.body;
  const omitKeys = ['_id', '_v', 'isIncrement', 'isFull'];
  const data = _.omit(req.body, omitKeys);
  const callback = (err, updated) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    return res.send(updated);
  }

  if (isFull) {
    Topic.findOneAndUpdate({'_id': req.params.id}, data, {'new': true}, callback);
  } else {
    Topic.findOneAndUpdate({'_id': req.params.id}, { '$inc': { count: isIncrement ? 1 : -1 } }, {'new': true}, callback);
  }
}

/**
 * Remove a topic
 */
export function remove(req, res) {
  const query = { id: req.params.id };
  Topic.findOneAndRemove({'_id': req.params.id}, (err, deleted) => {
    if (err) {
      console.log('Error on delete');
      return res.sendStatus(500);
    }

    if (!deleted) {
      return res.sendStatus(404);
    }

    return res.send(deleted);
  });
}

export default {
  all,
  add,
  update,
  remove
};
