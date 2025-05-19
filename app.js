const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use('/', routes); // toutes les routes regroupées ici


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API lancée sur le port ${PORT}`);
});
