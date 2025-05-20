const express = require('express');
const router = express.Router();

const AuthRoutes = require('./Auth');
const clientRoutes = require('./client');
const Test = require('./RouteTest');


router.use('/auth', AuthRoutes);
router.use('/client', clientRoutes);
router.use('/test', Test);

module.exports = router;
