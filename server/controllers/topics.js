var mongoose = require('mongoose');
var _ = require('lodash');
var Topic = mongoose.model('Topic');

let topicsController = {};

/**
 * List
 */
export function all(req, res) {
  Topic.find({}).exec(function(err, topics) {
    if(!err) {
      res.json(topics);
    }else {
      console.log('Error in first query');
    }
  });
};

topicsController.all = all;

/**
 * Add a Topic
 */
export function add(req, res) {
  Topic.create(req.body, function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send('OK');
  });
};

topicsController.add = add;

/**
 * Update a topic
 */
export function update(req, res) {
  var query = { id: req.params.id };
  var isIncrement = req.body.isIncrement;
  var isFull = req.body.isFull;
  var omitKeys = ['id', '_id', '_v', 'isIncrement', 'isFull'];
  var data = _.omit(req.body, omitKeys);

  if(isFull) {
    Topic.findOneAndUpdate(query, data, function(err, data) {
      if(err) {
        console.log('Error on save!');
        res.status(500).send('We failed to save to due some reason');
      }
      res.status(200).send('Updated successfully');
    });
  } else {
    Topic.findOneAndUpdate(query, { $inc: { count: isIncrement ? 1: -1 } }, function(err, data) {
      if(err) {
        console.log('Error on save!');
        // Not sure if server status is the correct status to return
        res.status(500).send('We failed to save to due some reason');
      }
      res.status(200).send('Updated successfully');
    });
  }
};

topicsController.update = update;

/**
 * Remove a topic
 */
export function remove(req, res) {
  var query = { id: req.params.id };
  Topic.findOneAndRemove(query, function(err, data) {
    if(err) console.log('Error on delete');
    res.status(200).send('Removed Successfully');
  });
};

topicsController.remove = remove;

export default topicsController;
