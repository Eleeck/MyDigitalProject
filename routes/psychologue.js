const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/AuthMiddleware');
const authorizeRoles = require('../middleware/AuthorizeMiddleware');

// Contrôleur pour les fonctionnalités de la psychologue
const psychologueController = require('../controllers/psychologueController');

// Toutes les routes sont protégées par authentification et rôle "psychologue"
router.use(authenticateToken, authorizeRoles('psychologue'));


// || Routes pour le profil de la psychologue || //
// 🔒 Voir son profil
router.get('/profil', psychologueController.getProfilePsychologue);

// 🔒 Mettre à jour son profil
router.put('/profil/update', psychologueController.updateMyProfile);

// 🔒 Changer le mot de passe
router.put('/profil/change-password', psychologueController.changeMyPassword);

//|| Routes pour la gestion des clients ||//
// 🔒 Voir tous les clients
router.get('/clients', psychologueController.getClients);

// 🔒 Voir un client
router.get('/clients/get/:id', psychologueController.getClientById);

// 🔒 Ajouter un client
router.post('/clients/add', psychologueController.createClient);

// 🔒 Supprimer un client
router.delete('/clients/delete/:id', psychologueController.deleteClient);


// || Routes pour les modules || //
// 🔒 Voir tous les modules
router.get('/modules', psychologueController.getModules);

// 🔒 Voir un module
router.get('/modules/get/:id', psychologueController.getModuleById);

// 🔒 Créer un module
router.post('/modules/add', psychologueController.createModule);

// 🔒 Mettre à jour un module
router.put('/modules/update/:id', psychologueController.updateModule);

// 🔒 Supprimer un module
router.delete('/modules/delete/:id', psychologueController.deleteModule);

//  🔒 Associer un module à un client
router.post('/modules/associer/:id', psychologueController.associerModule);

// // 🔒 Gérer les catégories

// 🔒 Voir toutes les catégories
router.get('/categories', psychologueController.getCategories);

// 🔒 Ajouter un module à une catégorie
router.post('/categories/add-module/:id', psychologueController.addModuleToCategorie);

// 🔒 Ajouter une catégorie
router.post('/categories/add', psychologueController.createCategorie);

// 🔒 Mettre à jour une catégorie
router.put('/categories/update/:id', psychologueController.updateCategorie);

// 🔒 Supprimer une catégorie
router.delete('/categories/delete/:id', psychologueController.deleteCategorie);

// 🔒 Voir tous les modules
router.get('/modules', psychologueController.getModules);

// 🔒 Voir un module
router.get('/modules/get/:id', psychologueController.getModuleById);

// 🔒 Créer un module
router.post('/modules/add', psychologueController.createModule);

// 🔒 Mettre à jour un module
router.put('/modules/update/:id', psychologueController.updateModule);

// 🔒 Supprimer un module
router.delete('/modules/delete/:id', psychologueController.deleteModule);

//  🔒 Associer un module à un client
router.post('/modules/associer/:id', psychologueController.associerModule);

// // 🔒 Gérer les catégories

// 🔒 Voir toutes les catégories
router.get('/categories', psychologueController.getCategories);

// 🔒 Voir les modules de la catégorie
router.get('/categories/:id/modules', psychologueController.getModulesByCategorie);

// 🔒 Ajouter un module à une catégorie
router.post('/categories/add-module/:id', psychologueController.addModuleToCategorie);

// 🔒 Ajouter une catégorie
router.post('/categories/add', psychologueController.createCategorie);

// 🔒 Mettre à jour une catégorie
router.put('/categories/update/:id', psychologueController.updateCategorie);

// 🔒 Supprimer une catégorie
router.delete('/categories/delete/:id', psychologueController.deleteCategorie);

// 🔒 Dissocier un module d'une catégorie
router.delete('/categories/delete-module/:id', psychologueController.deleteModuleFromCategorie);

module.exports = router;
