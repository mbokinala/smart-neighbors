'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const userRoutes = require('./api/routes/users');
const eventRoutes = require('./api/routes/events');

mongoose.connect(`
mongodb://android:android1234@ds027744.mlab.com:27744/smart-neighbors`, {
	useNewUrlParser: true,
});

app.disable('etag');

app.use(morgan('dev'));

app.get('/*', function (req, res, next) {
	res.setHeader('Last-Modified', (new Date()).toUTCString());
	next();
});

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		res.status(200).send('');
	}
	next();
});

app.use('/events', eventRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 400;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	console.log('Error: ' + error.message);
	res.json({
		message: error.message,
	});
});

module.exports = app;