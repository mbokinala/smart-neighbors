'use strict';

const mongoose = require('mongoose');

const prefsSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	ride: Boolean,
	party: Boolean,
	carpool: Boolean,
	park: Boolean,
});

module.exports = {
	schema: prefsSchema,
	model: mongoose.model('Prefs', prefsSchema),
};