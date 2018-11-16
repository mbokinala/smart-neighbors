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
		eventName: req.body.name,
		date: req.body.date,
		status: "Initiated",
		notes: req.params.notes,
		byName: req.body.byName
	});

	event.save()
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});
