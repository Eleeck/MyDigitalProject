// fichier : middleware/AuthorizeMiddleware.js

// Ce middleware vérifie si l'utilisateur a le rôle requis pour accéder à certaines routes.
// Il est utilisé pour restreindre l'accès à certaines fonctionnalités de l'application
// en fonction du rôle de l'utilisateur (ex: admin, psychologue, client).

module.exports = function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès interdit : vous ne disposez des autorisations nécessaires' });
    }
    next();
  };
};
