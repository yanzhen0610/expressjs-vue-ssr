const express = require('express');
const router = express.Router();

const middleware = require('../middleware');
const controller = require('../controller');
const routerFor = name => require('./' + name);

router.use(middleware('log'));
router.use(middleware('api'));
router.use(middleware('no-cache'));
router.use(middleware('parse-body-json'));
router.use(middleware('parse-body-urlencoded'));
router.use(middleware('merge-input'));

router.use('/auth', routerFor('auth'));
router.use('/csrf_token', routerFor('csrf_token'));

// If it's not matching any routes.
router.all('*', controller('api/not_found'));

module.exports = router;
