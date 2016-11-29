import _ from 'lodash';
import Topic from '../models/topics';

/**
 * List
 */
export function all(req, res) {
  Topic.find({}).exec((err, topics) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.json(topics);
  });
}

/**
 * Add a Topic
 */
export function add(req, res) {
  Topic.create(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    return res.status(200).send('OK');
  });
}

/**
 * Update a topic
 */
export function update(req, res) {
  const query = { id: req.params.id };
  const isIncrement = req.body.isIncrement;
  const isFull = req.body.isFull;
  const omitKeys = ['id', '_id', '_v', 'isIncrement', 'isFull'];
  const data = _.omit(req.body, omitKeys);

  new Promise(function(resolve, reject){//promise(find one Topic document)
    try {
      Topic.find(query, function(err, res){
        if(err) reject(err);
        let count = res.length;
        if (count === 1)
          resolve(res[0]);
        else
          reject("There were " + count + " documents matching query instead of 1 expected");
      });
    } catch (err) {
      console.log("Topic.find() try/catch block error");
    }
  })//close promise(Topic.find)
  
  .then((res) => {//.then(validate)
    return new Promise(function(resolve, reject){    
      isIncrement ? res.count += 1 : res.count -= 1;
        try{
          res.validate({}, (err) => {
            if(err){
              console.log("Error validating: " + JSON.stringify(err));
              reject(err);
            }
            else{
              console.log("validated model in then: " + JSON.stringify(res));
              resolve(res);
            }
          });
        } catch (err){
          console.log("validate try/catch threw error: " + JSON.stringify(err));
        }
    });//close promise
  })//close .then(validate)
  
  .then((res) => {//now update the document
    return new Promise(function(resolve, reject){
      try{
        if (isFull) {
          Topic.update(query, data, (err) => {
            if (err) {
              console.log("Error on save!");
              reject(err);
            }
            resolve("Updated successfully");
          });
        } else {
          Topic.update(query, { $inc: { count: isIncrement ? 1 : -1 } }, (err) => {
            if (err) {
              console.log("Error on save!");
              reject(err);
            }
            console.log("db.update result: ok");
            resolve("Updated successfully");
          });
        }
      } catch (err) {
        console.log("update try catch threw error: " + JSON.stringify(err));
      }
    });
  })//close .then(update)
  
  .then((res) => {
    return resp.status(200).send(res);
  })
  
  .catch((err) => {
    console.log("Sorry, error in db update: " + JSON.stringify(err));
    return resp.status(500).send('We failed to save for some reason');
  });
}

/**
 * Remove a topic
 */
export function remove(req, res) {
  const query = { id: req.params.id };
  Topic.findOneAndRemove(query, (err) => {
    if (err) {
      console.log('Error on delete');
      return res.status(500).send('We failed to delete for some reason');
    }

    return res.status(200).send('Removed Successfully');
  });
}

export default {
  all,
  add,
  update,
  remove
};
