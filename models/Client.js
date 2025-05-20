// fichier : models/Client.js

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.STRING,
    mot_de_passe: DataTypes.STRING,
    emploi_actuel: DataTypes.STRING,
    emploi_vise: DataTypes.STRING,
    competences: DataTypes.TEXT,
    experience: DataTypes.TEXT,
    notes: DataTypes.TEXT,
  }, {
    tableName: 'utilisateur',
    timestamps: false
  });

  return Client;
};
