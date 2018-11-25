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

	Event.findById(eventId, (err, doc) => {
		if(err) {
			console.log("error finding")
			res.status(500).send(err);
			return;
		}
		
		doc.yes = removeFromArray(req.body.id, doc.yes);
		doc.no = removeFromArray(req.body.id, doc.no);
		doc.maybe = removeFromArray(req.body.id, doc.maybe);
		
		switch(req.body.status) {
			case('yes'): {
				doc.yes.push(req.body.id);
			} case('no'): {
				doc.no.push(req.body.id);
			} case('maybe'): {
				doc.maybe.push(req.body.id);
			}
		}	
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