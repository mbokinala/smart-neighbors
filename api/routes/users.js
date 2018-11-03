const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

router.post('/', (req, res) => {
    console.log('Got Request!');
    res.status(200).json({
        message: 'hello!!!',
        email: req.body.email,
        password: req.body.password
    });
});

module.exports = router;