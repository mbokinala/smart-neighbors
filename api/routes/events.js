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

router.post('/:eventId/updateStatus', (req, res) => {
	const eventId = req.params.eventId;

	Event.findById(eventId, (err, result) => {
		if(err) {
			res.status(500).send(err);
			return;
		}
		
		removeFromArray(req.body.id, result.yes);
		removeFromArray(req.body.id, result.no);
		removeFromArray(req.body.id, result.maybe);

		switch(req.body.status) {
			case('yes'): {
				result.yes.push(req.body.id);
			} case('no'): {
				result.no.push(req.body.id);
			} case('maybe'): {
				result.maybe.push(req.body.id);
			}
		}

		result.save()
			.then((created) => {
				res.status(200).json(created);
			}).catch((error) => {
				res.status(500).json(error);
			});
	});
});

function removeFromArray(id, array){
	for(var i = array.length - 1; i--;){
		if (list[i] === id){
			list.splice(i, 1);
		}
	}
}

module.exports = router;