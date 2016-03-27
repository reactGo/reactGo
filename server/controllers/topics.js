var _ = require('lodash');
var Topic = require('../models').Topic;
var sequelize = require('../models/index').sequelize;

/**
 * List
 */
exports.all = function(req, res) {
  Topic.findAll().then(function(topics) {
    res.json(topics);
  }).catch(function(err) {
    console.log(err);
    res.status(500).send('Error in first query');
  });
};

/**
 * Add a Topic
 */
exports.add = function(req, res) {
  Topic.create(req.body).then(function (topic) {
    res.status(200).send('OK');
  }).catch(function(err) {
    console.log(err);
    res.status(400).send(err);
  });
};

/**
 * Update a topic
 */
exports.update = function(req, res) {
  var query = { id: req.params.id };
  var isIncrement = req.body.isIncrement;
  var isFull = req.body.isFull;
  var omitKeys = ['id', '_id', '_v', 'isIncrement', 'isFull'];
  var data = _.omit(req.body, omitKeys);

  if(isFull) {
    Topic.update(data, { where: query }).then(function(data) {
      res.status(200).send('Updated successfully');
    }).catch(function(err) {
      console.log(err);
      res.status(500).send('We failed to save for some reason');
    });
  } else {
    Topic.update({
      count: sequelize.literal('count' + (isIncrement ? '+' : '-') + 1)
    }, { where: query }).then(function(topics) {
      res.status(200).send('Updated successfully');
    }).catch(function(err) {
      console.log(err);
      // Not sure if server status is the correct status to return
      res.status(500).send('We failed to save for some reason');
    });
  }
};

/**
 * Remove a topic
 */
exports.remove = function(req, res) {
  Topic.destroy({ where: { id: req.params.id } }).then(function(data) {
    res.status(200).send('Removed Successfully');
  }).catch(function(err) {
    console.log(err);
    res.status(500).send('We failed to delete for some reason');
  });
};
