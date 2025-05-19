// File: models/SuiviModel.js

module.exports = (sequelize, DataTypes) => {
  const Suivi = sequelize.define('Suivi', {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    commentaire: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  Suivi.associate = (models) => {
    Suivi.belongsTo(models.Client, {
      foreignKey: 'id_client',
      as: 'client'
    });
    Suivi.belongsTo(models.Psychologue, {
      foreignKey: 'id_psychologue',
      as: 'psychologue'
    });
  };

  return Suivi;
};
