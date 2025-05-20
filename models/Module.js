// fichier : models/Module.js

module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    titre: DataTypes.STRING,
    description: DataTypes.TEXT,
    miniature: DataTypes.STRING,
    est_publie: DataTypes.BOOLEAN,
    est_gratuit: DataTypes.BOOLEAN,
    duree_estimee: DataTypes.INTEGER,
    cree_par: DataTypes.INTEGER
  }, {
    tableName: 'module',
    timestamps: false
  });

  return Module;
};


