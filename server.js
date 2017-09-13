// APP DEPENDENCIES AND SETUP
var express = require('express');
var path = require('path');
var port = 8000;
var app = express();

// SETUP EJS, STATIC & OTHER NEEDED FOLDERS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));

// ROUTES
app.get('/', function(req, res){
	console.log(req.ip);
	res.render('index');
});

// CATCH 404s
app.use(function(req, res, next) {
	  res.status(404).redirect('/');
});

// RUN SERVER
var server = app.listen(port, function(){
	console.log('Listening on http://localhost:'+port);
});

// RUN SOCKETS
require('./modules/sockets')(server);
