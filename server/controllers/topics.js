var mongoose = require('mongoose');
var _ = require('lodash');
var Topic = mongoose.model('Topic');


/**
 * List
 */
exports.all = function(req, res) {
  Topic.find({}).exec(function(err, topics) {
    if(!err) {
      res.json(topics);
    }else {
      console.log('Error in first query');
    }
  });
};

/**
 * Add a Topic
 */
exports.add = function(req, res) {
  Topic.create(req.body, function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send('OK');
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

/**
 * Remove a topic
 */
exports.remove = function(req, res) {
  var query = { id: req.params.id };
  Topic.findOneAndRemove(query, function(err, data) {
    if(err) console.log('Error on delete');
    res.status(200).send('Removed Successfully');
  });
};
