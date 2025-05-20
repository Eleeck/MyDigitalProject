// fichier : models/Block.js
module.exports = (sequelize, DataTypes) => {
  const Block = sequelize.define('Block', {
    type: DataTypes.ENUM('titre', 'texte', 'image', 'video', 'liste', 'fichier', 'citation')
  }, {
    tableName: 'bloc',
    timestamps: false
  });

  return Block;
};
