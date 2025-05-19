const express = require('express');
const router = express.Router();
const { Module } = require('../models');

// ✅ Liste des modules
router.get('/', async (req, res) => {
  try {
    const modules = await Module.findAll();
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Ajout module
router.post('/', async (req, res) => {
  try {
    const { id_categorie, titre, description, est_gratuit } = req.body;
    const newModule = await Module.create({ id_categorie, titre, description, est_gratuit });
    res.json(newModule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Suppression module
// Suppression d'un module par son ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Module.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: 'Module non trouvé.' });
    }

    res.status(200).json({ message: 'Module supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
});


module.exports = router;
