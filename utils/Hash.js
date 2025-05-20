// Hash.js
const bcrypt = require('bcrypt');

async function hashPassword(plainPassword) {
  const saltRounds = 10;
  try {
    const hashed = await bcrypt.hash(plainPassword, saltRounds);
    return hashed;
  } catch (err) {
    console.error('Erreur bcrypt:', err);
    process.exit(1);
  }
}


const input = process.argv[2];

if (!input) {
  console.error('Usage : node hash_password.js <mot_de_passe_en_clair>');
  process.exit(1);
}

hashPassword(input).then(hash => {
  console.log('Mot de passe hashé :', hash);
});
