// fichier : models/Rdv.js
module.exports = (sequelize, DataTypes) => {
  const Rdv = sequelize.define('Rdv', {
    patient_id: DataTypes.INTEGER,
    psychologue_id: DataTypes.INTEGER,
    date_heure: DataTypes.DATE,
    duree: DataTypes.INTEGER,
    type: DataTypes.ENUM('présentiel', 'visio', 'téléphone'),
    notes: DataTypes.TEXT,
    statut: DataTypes.ENUM('planifié', 'confirmé', 'annulé', 'terminé')
  }, {
    tableName: 'rendez_vous',
    timestamps: false
  });

  return Rdv;
};
