// fichier : models/ClientModule.js
module.exports = (sequelize, DataTypes) => {
  const ClientModule = sequelize.define('ClientModule', {
    module_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    progression: DataTypes.BOOLEAN,
    date_assignation: DataTypes.DATE,
    derniere_activite: DataTypes.DATE,
  }, {
    tableName: 'module_patient',
    timestamps: false
  });

  return ClientModule;
};
