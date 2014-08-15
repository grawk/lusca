'use strict';


var express = require('express'),
	cookieParser = require('cookie-parser'),
	session = require('cookie-session'),
	bodyParser = require('body-parser'),
	errorHandler = require('errorhandler'),
    lusca = require('./index');

var h = ['<html><head><title>views</title></head><body><h1>','</h1><form method="POST" action="/"><input type="hidden" name="_csrf" value="','"/><input type="submit" value="Submit"/></form></body></html>'];

//module.exports = function (config) {
    var app = express();

    app.use(cookieParser());
    app.use(session({ secret: 'abc' }));
    //app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(lusca({ csrf: true }));
    app.use(errorHandler());
app.get('/', function (req, res) {
        req.session.foo = 'bar';
            //console.log('res.locals._csrf', res.locals._csrf);
            res.status(200).send(h[0] + res.locals._csrf + h[1] + res.locals._csrf + h[2]);
        });
app.post('/', function (req, res) {
        req.session.foo = 'bar';
            //console.log('res.locals._csrf', res.locals._csrf);
            res.status(200).send(h[0] + res.locals._csrf + h[1] + res.locals._csrf + h[2]);
        });
app.listen(3000);
    //return app;
//};
