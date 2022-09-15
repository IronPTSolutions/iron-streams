const express = require('express');
const router = express.Router();
const streams = require('../controllers/streams.controller');

router.get('/streams', streams.list);

module.exports = router;