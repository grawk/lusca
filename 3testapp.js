var express = require('express'),
	lusca = require('./index');

var h = ['<html><head><title>views</title></head><body><h1>','</h1><form method="POST" action="/"><input type="hidden" name="_csrf" value="','"/><input type="submit" value="Submit"/></form></body></html>'];

//module.exports = function(config) {
	var app = express();

	app.use(express.cookieParser());
	app.use(express.session({
		secret: 'abc'
	}));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(lusca({
		csrf: true
	}));
	app.use(express.errorHandler());
	app.all('/', function(req, res) {
		//console.log('res.locals._csrf', res.locals._csrf);
		res.send(200, (h[0] + res.locals._csrf + h[1] + res.locals._csrf + h[2]));
	});
	app.listen(3000);
	//return app;
	//};