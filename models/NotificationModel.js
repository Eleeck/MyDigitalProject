// file : models/NotificationModel.js

module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        titre: DataTypes.STRING,
        contenu: DataTypes.TEXT,
        date: DataTypes.DATE,
        lu: DataTypes.BOOLEAN,
    });

    Notification.associate = (models) => {
        Notification.belongsTo(models.Client, {
            foreignKey: 'id_client',
            as: 'client'
        });
    }

    return Notification;
}