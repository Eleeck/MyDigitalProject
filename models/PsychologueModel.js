// File: models/PsychologueModel.js

module.exports = (sequelize, DataTypes) => {
  const Psychologue = sequelize.define('Psychologue', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: DataTypes.STRING,
    mot_de_passe: DataTypes.STRING,
  });

  Psychologue.associate = (models) => {
    Psychologue.hasMany(models.Client, {
      foreignKey: 'id_psychologue',
      as: 'utilisateur'
    });
    Psychologue.hasMany(models.Module, {
      foreignKey: 'id_psychologue',
      as: 'module'
    });
    Psychologue.hasMany(models.Suivi, {
      foreignKey: 'id_psychologue',
      as: 'suivi'
    });
    Psychologue.hasMany(models.Message, {
      foreignKey: 'id_psychologue',
      as: 'message'
    });
  }

  return Psychologue;
};
