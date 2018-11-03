const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

router.post('/', (req, res) => {
    console.log('Got Request!');
});

module.exports = router;