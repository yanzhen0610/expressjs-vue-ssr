const express = require('express');
const router = express.Router();

const controller = require('../controller');

router.get('/user', controller('api/auth/user'));
router.post('/login', controller('api/auth/login'));
router.post('/logout', controller('api/auth/logout'));

module.exports = router;
