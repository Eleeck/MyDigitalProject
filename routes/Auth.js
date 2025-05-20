const express = require('express');
const router = express.Router();
const { Psychologue, Client} = require('../models');
const AuthController = require('../controllers/AuthController');
const Authenticate = require('../middleware/AuthMiddleware');

// ✅ Connexion
// Route : connexion
router.post('/login', AuthController.login);

// ✅ Déconnexion
router.post('/logout', Authenticate.authenticate, AuthController.logout);



module.exports = router;
