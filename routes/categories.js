const express = require('express');
const router = express.Router();
const { Categorie } = require('../models');

// ✅ Liste des catégories
router.get('/', async (req, res) => {
  try {
    const categories = await Categorie.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Ajout catégorie
router.post('/', async (req, res) => {
  try {
    const { nom, description } = req.body;
    if (!nom || !description) {
      return res.status(400).json({ message: 'Nom et description requis.' });
    }

    const nouvelleCategorie = await Categorie.create({ nom, description });
    res.status(201).json(nouvelleCategorie);
  } catch (error) {
    console.error('Erreur création catégorie :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
});

// ✅ Suppression catégorie
// Suppression d'une catégorie par son ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Categorie.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: 'Catégorie non trouvée.' });
    }

    res.status(200).json({ message: 'Catégorie supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
});


module.exports = router;
