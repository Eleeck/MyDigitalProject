//  fichier : models/Content.js

module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define('Content', {
    module_id: DataTypes.INTEGER,
    bloc_id: DataTypes.INTEGER,
    contenu: DataTypes.TEXT,
    url_ressource: DataTypes.STRING,
    ordre: DataTypes.INTEGER,
    metadata: DataTypes.JSON
  }, {
    tableName: 'contenu_bloc',
    timestamps: false
  });

  return Content;
};
