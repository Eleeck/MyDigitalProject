const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database'); // ✅ Utilise l'instance directement

const db = {};

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associations
const { Client, Module, ClientModule, Block, Content, Rdv } = db;

if (Client && ClientModule) {
  Client.hasMany(ClientModule, { foreignKey: 'patient_id' });
  ClientModule.belongsTo(Client, { foreignKey: 'patient_id' });
}

if (Module && ClientModule) {
  Module.hasMany(ClientModule, { foreignKey: 'module_id' });
  ClientModule.belongsTo(Module, { foreignKey: 'module_id' });
}

if (Module && Content) {
  Module.hasMany(Content, { foreignKey: 'module_id' });
  Content.belongsTo(Module, { foreignKey: 'module_id' });
}

if (Block && Content) {
  Block.hasMany(Content, { foreignKey: 'bloc_id' });
  Content.belongsTo(Block, { foreignKey: 'bloc_id' });
}

if (Client && Rdv) {
  Client.hasMany(Rdv, { foreignKey: 'patient_id' });
  Rdv.belongsTo(Client, { foreignKey: 'patient_id' });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
