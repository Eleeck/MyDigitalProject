const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/AuthMiddleware');
const authorizeRoles = require('../middleware/AuthorizeMiddleware');

// Contrôleur pour les fonctionnalités client
const clientController = require('../controllers/clientController');

// Toutes les routes ci-dessous sont protégées par authentification et rôle "client"
router.use(authenticateToken, authorizeRoles('client'));

// 🔒 Voir son profil
router.get('/profil', clientController.getProfile);

// 🔒 Mettre à jour son profil
router.put('/profil/update', clientController.updateProfile);

// 🔒 Changer le mot de passe
router.put('/profil/change-password', clientController.changePassword);

// 🔒 Voir ses modules en cours
router.get('/modules-en-cours', clientController.getModulesEnCours);

// 🔒 Voir les modules disponibles
router.get('/modules-disponibles', clientController.getModulesClient);

// 🔒 Marquer un module comme complété
router.post('/modules/completé/:id', clientController.marquerModuleCommeComplete);

// 🔒 Voir les modules complétés
router.get('/modules/historique', clientController.getHistoriqueModulesClient);

module.exports = router;
