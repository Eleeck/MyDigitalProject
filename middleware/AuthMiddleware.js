// fichier : middleware/AuthMiddleware.js
// Ce middleware vérifie si l'utilisateur est authentifié
// et si le token JWT est valide avant de permettre l'accès à certaines routes.

const { TokenBlacklist } = require('../models');
const jwt = require('jsonwebtoken');

async function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token manquant' });

  try {
    // Vérifie si le token est blacklisté
    const blacklisted = await TokenBlacklist.findOne({ where: { token } });
    if (blacklisted) {
      return res.status(401).json({ message: 'Token invalide (blacklisté)' });
    }

    // Vérification JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id || !decoded.role) {
      return res.status(403).json({ message: 'Token invalide (incomplet)' });
    }

    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide' });
  }
}

// Middleware de restriction par rôle
function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: 'Accès interdit: rôle insuffisant' });
    }
    next();
  };
}

module.exports = { authenticate, authorizeRole };
