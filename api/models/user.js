'use strict';

const mongoose = require('mongoose');

const prefsSchema = require('./prefs').schema;

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  password: String,
  name: String,
  address: String,
  phone: String,
  prefs: prefsSchema,
});

module.exports = mongoose.model('User', userSchema);
