// File: models/ModuleModel.js

module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    // id_categorie: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    titre: DataTypes.STRING,
    description: DataTypes.TEXT,
  });

  Module.associate = (models) => {
    Module.belongsTo(models.Psychologue, {
      foreignKey: 'id_psychologue'
    });
    Module.hasMany(models.Seance, {
      foreignKey: 'id_module',
      as: 'seance'
    });
  }

  return Module;
};
