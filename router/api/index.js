const express = require('express');
const router = express.Router();

const middleware = require('../middleware');
const controller = require('../controller');
const routerFor = name => require('./' + name);

router.use(middleware('api'));
router.use(middleware('no-cache'));

router.use('/auth', routerFor('auth'));

// If it's not matching any routes.
router.all('*', controller('api/not_found'));

module.exports = router;
