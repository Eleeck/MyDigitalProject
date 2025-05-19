const express = require('express');
const router = express.Router();

const userRoutes = require('./Auth');
const clientRoutes = require('./client');
const psychologueRoutes = require('./psychologue');

router.use('/users', userRoutes);
router.use('/client', clientRoutes);
router.use('/psychologue', psychologueRoutes);

module.exports = router;
