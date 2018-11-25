'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Event = require('../models/event');

router.post('/:id', (req, res) => {
	var event = new Event({
		_id: new mongoose.Types.ObjectId,
		hostId: req.params.id,
		category: req.body.category,
		place1: req.body.place1,
		place2: req.body.place2,
		eventName: req.body.eventName,
		date: req.body.date,
		status: "Initiated",
		notes: req.body.notes,
		byName: req.body.byName,
		yes:["x"],
		no: ["x"],
		maybe: ["x"]
	});

	event.save()
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(500).send(err);
			return;
		});
});

router.post('/updateStatus/:eventId', (req, res) => {
	console.log("Trying to updates");
	var eventId = req.params.eventId;

	var yes, no, maybe;

	Event.findById(eventId, (err, result) => {
		if(err) {
			console.log("error finding")
			res.status(500).send(err);
			return;
		}

		console.log(JSON.stringify(result));
		
		yes = removeFromArray(req.body.id, result.yes);
		no = removeFromArray(req.body.id, result.no);
		maybe = removeFromArray(req.body.id, result.maybe);
	});

	switch(req.body.status) {
		case('yes'): {
			yes.push(req.body.id);
		} case('no'): {
			no.push(req.body.id);
		} case('maybe'): {
			maybe.push(req.body.id);
		}
	}

	console.log("finding by " + eventId);
	
	var updates = {yes: yes, no: no, maybe: maybe};
	var options = {new: true};
	var query = {_id: eventId};

	Event.findOneAndUpdate(query, updates, options, (err, created) => {
		if(err) {
			console.log("error while updating");
			res.status(500).send(err);
			return;
		}
		
		console.log("updated document: " + JSON.stringify(created));
		res.status(200).json(created);
	});

	
});

router.get('/by/:id', (req, res) => {
	var id = req.params.id;

	Event.find({hostId: id}, (err, results) => {
		if(err) {
			res.status(500).send(err);
			return;
		}
		
		console.log("Results: " + JSON.stringify(results));
		res.status(200).json(results); 
	});
});

function removeFromArray(id, array){
	var returnValue = [""];

	for(var i = 0; i < array.length; i++) {
		if(array[i] != id) {
			returnValue.push(array[i]);
		}
	}

	console.log("array value: " + JSON.stringify(returnValue));
	return returnValue;
}

//Test

module.exports = router;