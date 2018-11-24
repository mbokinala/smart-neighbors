'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Event = require('../models/event');

router.post('/:id', (req, res) => {
	const event = new Event({
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
		yes:[],
		no: [],
		maybe: []
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
	const eventId = req.params.eventId;

	const yes;
	const no;
	const maybe;

	Event.findById(eventId, (err, result) => {
		if(err) {
			console.log("error finding")
			res.status(500).send(err);
			return;
		}
		
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

	Event.findByIdAndUpdate(req.params.id, {$set: {yes, no, maybe}}, (err, result) => {
		if(err) {
			console.log("error while updating");
			res.status(500).send(err);
			return;
		}
		
		console.log("updated document: " + JSON.stringify(result));
		res.status(200).json(result);
	});

	
});

router.get('/by/:id', (req, res) => {
	const id = req.params.id;

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
	console.log("in removeFromArray");
	for(var i = array.length - 1; i >= 0; i--){
		console.log("i is ", i, " id is ", array[i]);
		if (array[i] === id){
			console.log("match");
			array.splice(i, 1);
		}
	}

	return array;
}

//Test

module.exports = router;