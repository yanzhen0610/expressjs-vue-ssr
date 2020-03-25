const path = require('path');
const express = require('express');
const router = express.Router();

router.use(express.static(path.resolve(__dirname, '..', 'dist')));

module.exports = router;
