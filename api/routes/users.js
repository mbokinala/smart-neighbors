const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

router.post('/', (req, res) => {
    console.log('Got Request!');
    res.status(200).json({
        email: req.body.email + 'hello!!',
        password: req.body.password
    });
});

module.exports = router;