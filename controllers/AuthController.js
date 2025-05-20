// File: controllers/AuthController.js

const { Client, TokenBlacklist } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("➡️ Tentative login avec :", email);

    const client = await Client.findOne({ where: { email } });
    // const psychologue = await Psychologue.findOne({ where: { email } });

    if (!client) {
      // console.log("❌ Aucun client trouvé avec cet email.");
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // console.log("✅ Client trouvé :", client.email);

    const isMatch = await bcrypt.compare(password, client.mot_de_passe);
    if (!isMatch) {
      console.log("❌ Mot de passe incorrect.");
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // if (!psychologue) {
    //   console.log("❌ Aucun psychologue trouvé avec cet email.");
    //   return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    // }
    // console.log("✅ Psychologue trouvé :", psychologue.email);
    // const isMatch = await bcrypt.compare(password, psychologue.mot_de_passe);
    // if (!isMatch) {
    //   console.log("❌ Mot de passe incorrect.");
    //   return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    // }

    const token = jwt.sign(
      { id: client.id, role: 'client' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION || '1h' }
    );

    res.status(200).json({
      message: 'Connexion réussie',
      token,
      client: {
        id: client.id,
        nom: client.nom,
        prenom: client.prenom,
        email: client.email,
        telephone: client.telephone
      }
    });
  } catch (error) {
    console.error('Erreur dans login :', error);
    res.status(500).json({ message: 'Erreur serveur', error });
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

