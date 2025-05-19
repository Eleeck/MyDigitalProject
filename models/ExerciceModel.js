// file : models/ExerciceModel.js

module.exports = (sequelize, DataTypes) => {
    const Exercice = sequelize.define('Exercice', {
        titre: DataTypes.STRING,
        consigne: DataTypes.TEXT,
    });

    Exercice.associate = (models) => {
        Exercice.belongsTo(models.Seance, {
            foreignKey: 'id_seance',
            as: 'seance'
        });
        Exercice.hasMany(models.Question, {
            foreignKey: 'id_exercice',
            as: 'question'
        });
    }

    return Exercice;
}