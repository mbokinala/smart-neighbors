'use strict';

const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  hostId: String,
  category: String,
  place1: String,
  place2: String,
  eventName: String,
  date: String,
  status: String,
  notes: String,
  byName: String,
});

module.exports = mongoose.model('Event', eventSchema);
