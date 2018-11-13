'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const User = require('../models/user');
const Prefs = require('../models/prefs').model;

router.post('/', (req, res) => {
  console.log('CREATING NEW USER!!!!!!!!!!!!!!!!!!');
  console.log(JSON.stringify(req.body));
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
  });

  user.save()
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('error');
    });
});

router.post('/:id/setPrefs', (req, res) => {
  const id = req.params.id;

  const prefs = new Prefs({
    ride: req.body.ride,
    party: req.body.party,
    carpool: req.body.carpool,
    park: req.body.park,
  });

  User.findById(id, (err, result) => {
    if (err){
      console.log('Error on find ' + err);
      res.status(500).json({message: 'error'});
      return;
    }

    result.prefs = prefs;

    result.save()
      .then((savedUser) => {
        res.status(200).json(savedUser);
      })
      .catch((err) => {
        res.status(500).send(err);
      });

  });
});

router.post('/login', (req, res) => {
  console.log(req.body.password);

  User.findOne({username: req.body.username}, (err, result) => {
    if (err){
      console.log('Error on find ' + err);
      res.status(500).json({message: 'error'});
      return;
    }

    if (!result) {
      res.status(200).json({status: 'failure'});
      console.log('Invalid credentials');
      return;
    }

    if (req.body.password !== result.password) {
      res.status(200).json({status: 'failure'});
      return;
    }


    console.log('Success');
    res.status(200).send({
      status: 'success',
      id: result._id,
      name: result.name,
      email: result.email,
    });
    return;
  });
});

module.exports = router;