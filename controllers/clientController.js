const { Client, Module, ClientModule, Block, Content, Rdv } = require('../models');
const { TokenBlacklist } = require('../models');
const jwt = require('jsonwebtoken');

// GET /client/me
exports.getCurrentUser = async (req, res) => {
  try {
    const client = await Client.findByPk(req.user.id, {
      attributes: ['id', 'nom', 'prenom', 'email', 'emploi_actuel', 'emploi_vise', 'experience' , 'competences']
    });
    if (!client) return res.status(404).json({ message: 'Client introuvable' });
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// GET /client/modules
exports.getModules = async (req, res) => {
  try {
    const modules = await ClientModule.findAll({
      where: { patient_id: req.user.id },
      include: [Module]
    });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// GET /client/modules/:id
exports.getModuleById = async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id);
    if (!module) return res.status(404).json({ message: 'Module introuvable' });
    res.json(module);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// GET /client/modules/patient/:id
exports.getModulesByClientId = async (req, res) => {
  try {
    const modules = await ClientModule.findAll({
      where: { patient_id: req.params.id },
      include: [Module]
    });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// GET /client/rdv
exports.getRDV = async (req, res) => {
  try {
    const rdvs = await Rdv.findAll({ where: { patient_id: req.user.id } });
    res.json(rdvs);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// GET /client/blocks
exports.getBlocks = async (req, res) => {
  try {
    const blocks = await Block.findAll();
    res.json(blocks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// GET /client/blocks/:id/contents
exports.getContenusBlocks = async (req, res) => {
  try {
    const contents = await Content.findAll({ where: { bloc_id: req.params.id } });
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// POST /client/modules/:id/validate
exports.validateModule = async (req, res) => {
  try {
    const moduleClient = await ClientModule.findOne({
      where: {
        patient_id: req.user.id,
        module_id: req.params.id
      }
    });

    if (!moduleClient) return res.status(404).json({ message: 'Module non attribué à ce client.' });

    moduleClient.estComplete = true;
    await moduleClient.save();

    res.json({ message: 'Module validé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// POST /client/logout
exports.logout = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant' });

  try {
    const blacklisted = await TokenBlacklist.findOne({ where: { token } });
    if (blacklisted) return res.status(200).json({ message: 'Déjà déconnecté' });
    await TokenBlacklist.create({ token });
    res.status(200).json({ message: 'Déconnexion réussie' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
