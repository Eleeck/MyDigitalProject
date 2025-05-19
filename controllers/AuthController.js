// File: controllers/AuthController.js

const { Client, Psychologue, TokenBlacklist } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Connexion client ou psychologue
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // On teste d'abord les psychologues
    let user = await Psychologue.findOne({ where: { email } });
    let role = 'psychologue';

    // Sinon, on teste côté client
    if (!user) {
      user = await Client.findOne({ where: { email } });
      role = 'client';
    }

    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const isValid = await bcrypt.compare(password, user.mot_de_passe);
    if (!isValid) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign(
      { id: user.id, role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION || '1h' }
    );

    const redirectTo = role === 'psychologue' ? '/dashboard/admin' : '/dashboard/client';

    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role
      },
      redirectTo
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Déconnexion (blacklist token)
exports.logout = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token manquant' });

  try {
    const alreadyBlacklisted = await TokenBlacklist.findOne({ where: { token } });

    if (alreadyBlacklisted) {
      return res.status(200).json({ message: 'Déjà déconnecté' });
    }

    await TokenBlacklist.create({ token });

    return res.status(200).json({ message: 'Déconnexion réussie' });
  } catch (err) {
    console.error('Erreur lors de la déconnexion :', err);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Création de compte client
exports.createClient = async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe, date_naissance, genre, id_psychologue } = req.body;

    if (!nom || !prenom || !email || !mot_de_passe) {
      return res.status(400).json({ message: 'Champs obligatoires manquants.' });
    }

    const existing = await Client.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'Email déjà utilisé.' });
    }

    const hashed = await bcrypt.hash(mot_de_passe, 10);

    const client = await Client.create({
      nom,
      prenom,
      email,
      mot_de_passe: hashed,
      date_naissance,
      genre,
      id_psychologue
    });

    res.status(201).json({
      message: 'Client créé avec succès.',
      client: {
        id: client.id,
        nom: client.nom,
        prenom: client.prenom,
        email: client.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};
