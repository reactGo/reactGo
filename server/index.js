var express = require('express');
var path = require('path');

var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.join(__dirname, '..', 'public')));

// How do we send a json response
// app.get('/', function(request, response) {
// 	response.send('Hello World');
// });

app.get('/topic', function(request, response) {
	// Make call to database
	response.json({
		'1234': {
					id: '1234',
					count: 4,
					text: 'Cafe 51 is pretty decent.'
				},
		'2345': {
				id: '2345',
				count: 10,
				text: 'But Merrywell makes really awesome burgers.'
		},
		'3456': {
				id: '3456',
				count: 12,
				text: 'Ken Burger'
		}
	});
});

app.listen(app.get('port'), function() {
	console.log('Node app is running at localhost:' + app.get('port'));
});