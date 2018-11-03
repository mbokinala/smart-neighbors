const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

router.post('/', (req, res) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address
    });
  
    // user.save()
    //     .then(result => {
    //         console.log(result);
    //         res.status(201).json(result);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).send('error');
    //     });
});

router.get('/', (req, res) => {
    res.status(200).json({message: 'hello', blah:'blah'});
});

module.exports = router;