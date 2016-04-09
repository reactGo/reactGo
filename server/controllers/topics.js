const _ = require('lodash');
const Topic = require('../models').Topic;
const sequelize = require('../models/index').sequelize;

/**
 * List
 */
exports.all = (req, res) => {
  Topic.findAll().then((topics) => {
    res.json(topics);
  }).catch((err) => {
    console.log(err);
    res.status(500).send('Error in first query');
  });
};

/**
 * Add a Topic
 */
exports.add = (req, res) => {
  Topic.create(req.body).then(() => {
    res.status(200).send('OK');
  }).catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });
};

/**
 * Update a topic
 */
exports.update = (req, res) => {
  const query = { id: req.params.id };
  const isIncrement = req.body.isIncrement;
  const isFull = req.body.isFull;
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
      count: sequelize.literal(`count${sign}1`)
    }, { where: query }).then(() => {
      res.status(200).send('Updated successfully');
    }).catch((err) => {
      console.log(err);
      // Not sure if server status is the correct status to return
      res.status(500).send('We failed to save for some reason');
    });
  }
};

/**
 * Remove a topic
 */
exports.remove = (req, res) => {
  Topic.destroy({ where: { id: req.params.id } }).then(() => {
    res.status(200).send('Removed Successfully');
  }).catch((err) => {
    console.log(err);
    res.status(500).send('We failed to delete for some reason');
  });
};
