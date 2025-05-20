const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Détecte l'environnement actuel (development ou production)
const env = process.env.NODE_ENV || 'development';

// Charge le bon fichier .env
if (env === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env.development' });
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Connexion à la base de données réussie.'))
  .catch((err) => console.error('❌ Erreur de connexion à la base de données :', err));


module.exports = sequelize;
