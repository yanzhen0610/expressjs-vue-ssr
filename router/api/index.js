const express = require('express');
const router = express.Router();

const middleware = require('../middleware');
const routerFor = name => require('./' + name);

router.use(middleware('api'));
router.use(middleware('no-cache'));
router.use('/auth', routerFor('auth'));

module.exports = router;
