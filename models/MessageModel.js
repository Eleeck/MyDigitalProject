// file : models/MessageModel.js

module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        contenu: DataTypes.TEXT,
        date_envoi: DataTypes.DATE,
        expediteur: DataTypes.STRING,
    });

    Message.associate = (models) => {
        Message.belongsTo(models.Client, {
            foreignKey: 'id_client',
            as: 'client'
        });
        Message.belongsTo(models.Psychologue, {
            foreignKey: 'id_psychologue',
            as: 'psychologue'
        });
    }

    return Message;
}