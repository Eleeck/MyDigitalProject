// File : controllers/psychologueController.js

const { Psychologue, Client } = require('../models');
const bcrypt = require('bcrypt');


// **Gestion du profil de la psychologue** //

// Récupérer le profil de la psychologue connectée
exports.getProfilePsychologue = async (req, res) => {
  try {
    const id = req.user.id;
    const psychologue = await Psychologue.findByPk(id, {
      attributes: ['id', 'nom', 'prenom', 'email']
    });

    if (!psychologue) {
      return res.status(403).json({ message: 'Accès refusé. Utilisateur non trouvé.' });
    }

    res.json(psychologue);
  } catch (error) {
    console.error("Erreur dans getProfilePsychologue:", error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Mettre à jour le profil de la psychologue
exports.updateMyProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const { nom, prenom, email } = req.body;

    const psychologue = await Psychologue.findByPk(id);
    if (!psychologue) {
      return res.status(403).json({ message: 'Accès refusé.' });
    }

    if (email && email !== psychologue.email) {
      const existing = await Psychologue.findOne({ where: { email } });
      if (existing) {
        return res.status(400).json({ message: 'Email déjà utilisé.' });
      }
    }

    psychologue.nom = nom || psychologue.nom;
    psychologue.prenom = prenom || psychologue.prenom;
    psychologue.email = email || psychologue.email;
    await psychologue.save();

    res.json({ message: 'Profil mis à jour avec succès', psychologue });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Modifier le mot de passe
exports.changeMyPassword = async (req, res) => {
  try {
    const id = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const psychologue = await Psychologue.findByPk(id);
    if (!psychologue) {
      return res.status(403).json({ message: 'Accès refusé.' });
    }

    const isMatch = await bcrypt.compare(oldPassword, psychologue.mot_de_passe);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe actuel incorrect.' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    psychologue.mot_de_passe = hashed;
    await psychologue.save();

    res.json({ message: 'Mot de passe mis à jour avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

//**Gestion des clients **//

// Récupérer tous les clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.findAll({
      attributes: ['id', 'nom', 'prenom', 'email']
    });

    if (clients.length === 0) {
      return res.status(404).json({ message: 'Aucun client trouvé.' });
    }

    res.json(clients); // Correction: renvoyer directement le tableau de clients
  } catch (error) {
    console.error("Erreur dans getClients:", error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
}

// Récupérer un client par ID
exports.getClientById = async (req, res) => {
  try {
    const idClient = req.params.id;

    const client = await Client.findOne({
      where: { id: idClient },
      attributes: ['id', 'nom', 'prenom', 'email']
    });

    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé.' });
    }

    res.json(client);
  } catch (error) {
    console.error("Erreur dans getClientById:", error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Modifier un client
exports.updateClient = async (req, res) => {
  try {
    const idClient = req.params.id;
    const { nom, prenom, email, date_naissance, genre } = req.body;

    const client = await Client.findOne({
      where: { id: idClient }
    });

    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé.' });
    }

    // Vérifier si l'email est déjà utilisé par un autre client
    if (email && email !== client.email) {
      const existingClient = await Client.findOne({ where: { email } });
      if (existingClient) {
        return res.status(400).json({ message: 'Email déjà utilisé par un autre client.' });
      }
    }

    // Mettre à jour les champs
    client.nom = nom || client.nom;
    client.prenom = prenom || client.prenom;
    client.email = email || client.email;
    client.date_naissance = date_naissance || client.date_naissance;
    client.genre = genre || client.genre;

    await client.save();

    res.json({ 
      message: 'Client mis à jour avec succès', 
      client: {
        id: client.id,
        nom: client.nom,
        prenom: client.prenom,
        email: client.email,
        date_naissance: client.date_naissance,
        genre: client.genre
      } 
    });
  } catch (error) {
    console.error("Erreur dans updateClient:", error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Supprimer un client
exports.deleteClient = async (req, res) => {
  try {
    const idClient = req.params.id;

    const client = await Client.findOne({
      where: { id: idClient }
    });

    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé.' });
    }

    // Suppression du client
    await client.destroy();

    res.json({ message: 'Client supprimé avec succès' });
  } catch (error) {
    console.error("Erreur dans deleteClient:", error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};