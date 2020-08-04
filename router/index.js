const express = require('express');

// import helper
const controller = require('./controller');
const middleware = require('./middleware');
const routerFor = name => require('./' + name);

// create router
const router = express.Router();

// middleware
router.use(middleware('log'));
router.use(middleware('parse-cookie'));
router.use(middleware('session'));

// sub router
router.use('/api', routerFor('api'));
router.use('/public', routerFor('public'));

// spa
router.get('*', middleware('log'));
router.get('*', controller('spa'));

// error handler (must be the last)
router.use(middleware('error-handler'));

// export router
module.exports = router;
