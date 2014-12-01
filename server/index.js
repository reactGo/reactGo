var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var mongoose = require('mongoose');

var app = express();

// Find the appropriate database to connect to, default to localhost if not found.
var uristring = process.env.MONGOHQ_URL ||
	process.env.MONGOLAB_URI ||
	'mongodb://localhost/ReactWebpackNode';

mongoose.connect(uristring, function(err, res) {
	if(err) {
		console.log('Error connecting to: ' + uristring + '. ' + err);
	}else {
		console.log('Succeeded connected to: ' + uristring);
	}
});

// Schema
var topicSchema = new mongoose.Schema({
	id: String,
	text: String,
	count: { type: Number, min: 0 },
	date: { type: Date, default: Date.now }
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topics' collection in the MongoDB database
var TopicModels = mongoose.model('Topics', topicSchema);

// TopicModels.remove({}, function(err) {
// 	if(err) {
// 		console.log('Error in deleting old data');
// 	}
// });
// // Creating one user.
// var kenBurger = new TopicModels ({
//   text: 'Ken Burger which is pretty awesome',
//   count: 1
// });

// var bapBurger = new TopicModels ({
// 	text: 'Bap Burger is a rice burger',
// 	count: 2
// });

// Saving it to the database.  
// kenBurger.save(function (err) {if (err) console.log ('Error on save!')});
// bapBurger.save(function (err) {if (err) console.log ('Error on save!')});

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, '..', 'public')));


app.get('/topic', function(request, response) {
	// Let's find all the documents
	TopicModels.find({}).exec(function(err, topics) {
		if(!err) {
			response.json(topics);
		}else {
			console.log('Error in first query');
		}
	});
});

app.post('/topic', function(request, response) {
	TopicModels.create(request.body, function (err) {if (err) console.log ('Error on save!')} );
});

app.put('/topic', function(request, response) {
	var query = { id: request.body.id };
	TopicModels.findOneAndUpdate(query, request.body, function(err, data) {
		if(err) console.log('Error on save!');
		console.log(data);
	});
});


app.listen(app.get('port'), function() {
	console.log('Node app is running at localhost:' + app.get('port'));
});