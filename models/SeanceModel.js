// file : models/SeanceModel.js

module.exports = (sequelize, DataTypes) => {
    const Seance = sequelize.define('Seance', {
        titre: DataTypes.STRING,
        date: DataTypes.DATE,
    });

    Seance.associate = (models) => {
        Seance.belongsTo(models.Client, {
            foreignKey: 'id_client',
            as: 'client'
        });
        Seance.belongsTo(models.Module, {
            foreignKey: 'id_module',
            as: 'module'
        });
        Seance.hasMany(models.Exercice, {
            foreignKey: 'id_seance',
            as: 'exercice'
        });
    }

    return Seance;
};