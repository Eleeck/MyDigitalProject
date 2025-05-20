const bcrypt = require('bcrypt');
const sequelize = require('../config/database'); 
const { Client } = require('../models/index'); 
// const {Psychologue} = require('../models/index');

async function hashPassword(plainPassword) {
  const saltRounds = 10;
  return bcrypt.hash(plainPassword, saltRounds);
}

async function updatePasswords() {
  try {
    await sequelize.authenticate();
    console.log('Connexion DB OK');

    // Récupérer tous les clients
    const clients = await Client.findAll();
    // const psychologues = await Psychologue.findAll();

    for (const client of clients) {
      const currentPassword = client.mot_de_passe;

      
      if (!currentPassword || currentPassword.length > 60) {
        console.log(`Client ${client.id} : mot de passe déjà hashé ou vide, skip.`);
        continue;
      }

      const hashedPassword = await hashPassword(currentPassword);
      client.mot_de_passe = hashedPassword;

      await client.save();
      console.log(`Client ${client.id} : mot de passe hashé et mis à jour.`);
    }

    // for (const psychologue of psychologues) {
    //   const currentPassword = psychologue.mot_de_passe;
    //   if (!currentPassword || currentPassword.length > 60) {
    //     console.log(`Psychologue ${psychologue.id} : mot de passe déjà hashé ou vide, skip.`);
    //     continue;
    //   }
    //   const hashedPassword = await hashPassword(currentPassword);
    //   psychologue.mot_de_passe = hashedPassword;
    //   await psychologue.save();
    //   console.log(`Psychologue ${psychologue.id} : mot de passe hashé et mis à jour.`);
    // }

    console.log('Mise à jour terminée !');
    process.exit(0);
  } catch (err) {
    console.error('Erreur:', err);
    process.exit(1);
  }
}

updatePasswords();
