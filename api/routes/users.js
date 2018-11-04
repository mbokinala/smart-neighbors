const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const User = require('../models/user');

router.post('/', (req, res) => {
    console.log('CREATING NEW USER!!!!!!!!!!!!!!!!!!');
    console.log(JSON.stringify(req.body));
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address
    });
  
    user.save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('error');
        });
});

router.get('/', (req, res) => {
    res.status(200).json({message: 'hello', blah:'blah'});
});

router.post('/login', (req, res) => {
    console.log(req.body.password);

    User.findOne({username: req.body.username}, (err, result) => {
        if(err){
            console.log('Error on find ' + err);
            res.status(500).json({message: 'error'});
            return;
        }
        
        console.log('Checking password ' + req.body.password + ' against ' + result.password);
        if(req.body.password != result.password) {
            res.status(200).json({status: 'failure'});
            console.log('Invalid credentials');
            return;
        }

        console.log('Success');
        res.status(200).send({status: "success", id: result._id});
        return;
    })
});

module.exports = router;