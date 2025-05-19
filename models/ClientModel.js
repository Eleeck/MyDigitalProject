// file : models/ClientModel.js
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: DataTypes.STRING,
    mot_de_passe: DataTypes.STRING,
    date_naissance: DataTypes.DATE,
    genre: DataTypes.STRING,
  });

  Client.associate = (models) => {
    Client.belongsTo(models.Psychologue, {
      foreignKey: 'id_psychologue',
      as: 'psychologue'
    });
    Client.hasMany(models.Suivi, {
      foreignKey: 'id_client',
      as: 'suivi'
    });
    Client.hasMany(models.Message, {
      foreignKey: 'id_client',
      as: 'message'
    });
    Client.hasMany(models.Reponse, {
      foreignKey: 'id_client',
      as: 'reponse'
    });
    Client.hasMany(models.Seance, {
      foreignKey: 'id_client',
      as: 'seance'
    });
    Client.hasMany(models.Notification, {
      foreignKey: 'id_client',
      as: 'notification'
    });

  }

  return Client;
};