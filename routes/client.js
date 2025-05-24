// Fichier : routes/client.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const AuthController = require('../controllers/AuthController');

const { authenticate, authorizeRole } = require('../middleware/AuthMiddleware');

router.use(authenticate, authorizeRole('client'));


router.get('/profile', clientController.getCurrentUser);
router.get('/profile/update', clientController.updateProfile);
router.get('/modules', clientController.getModules);
router.get('/modules/:id', clientController.getModuleById);
router.get('/modules/patient/:id', clientController.getModulesByClientId);
router.get('/rdv', clientController.getRDV);
router.get('/blocks', clientController.getBlocks);
router.get('/blocks/:id/contents', clientController.getContenusBlocks);
router.post('/modules/:id/validate', clientController.validateModule);
router.post('/logout', AuthController.logout);

module.exports = router;
