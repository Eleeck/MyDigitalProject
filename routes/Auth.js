const express = require('express');
const router = express.Router();
const { Psychologue, Client} = require('../models');
const AuthController = require('../controllers/usersController');
const authenticate = require('../middleware/AuthMiddleware');

// ✅ Connexion
// Route : connexion
router.post('/login', AuthController.login);


// Route : tester l'authentification
router.get('/me', authenticate, (req, res) => {
  res.status(200).json({ message: 'Tu es authentifié !', user: req.user });
});



// ✅ Déconnexion
router.post('/logout', authenticate, userController.logout);



module.exports = router;
