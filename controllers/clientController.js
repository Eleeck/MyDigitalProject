// file : controllers/clientController.js
const { Client, Module, Psychologue, Seance, Suivi, Notification, Message, Reponse } = require('../models');
const bcrypt = require('bcrypt');

// || Fonctionnalités du client || //

// ||Fonctionnalités liées au profil du client || //
// Voir le profil du client connecté
exports.getProfile = async (req, res) => {
  try {
    const clientId = req.user.id;
    const client = await Client.findByPk(clientId, {
      attributes: ['id', 'nom', 'prenom', 'email', 'date_naissance', 'genre']
    });

    if (!client) {
      return res.status(403).json({ message: 'Accès refusé. Client non trouvé.' });
    }

    res.json(client);
  } catch (error) {
    console.error("Erreur dans getProfile :", error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Mettre à jour le profil du client connecté
exports.updateProfile = async (req, res) => {
  try {
    const clientId = req.user.id;
    const { nom, prenom, email, date_naissance, genre } = req.body;

    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(403).json({ message: 'Accès refusé. Client non trouvé.' });
    }

    // Vérifier si l'email est déjà utilisé par un autre client
    if (email && email !== client.email) {
      const existingClient = await Client.findOne({ where: { email } });
      if (existingClient) {
        return res.status(400).json({ message: 'Email déjà utilisé.' });
      }
    }

    // Mettre à jour les informations du client
    client.nom = nom || client.nom;
    client.prenom = prenom || client.prenom;
    client.email = email || client.email;
    client.date_naissance = date_naissance || client.date_naissance;
    client.genre = genre || client.genre;

    await client.save();

    res.json({ 
      message: 'Profil mis à jour avec succès', 
      client: {
        id: client.id,
        nom: client.nom,
        prenom: client.prenom,
        email: client.email,
        date_naissance: client.date_naissance,
        genre: client.genre
      }
    });
  } catch (error) {
    console.error("Erreur dans updateProfile :", error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Changer le mot de passe du client connecté
exports.changePassword = async (req, res) => {
  try {
    const clientId = req.user.id;
    const { ancienMotDePasse, nouveauMotDePasse } = req.body;

    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(403).json({ message: 'Accès refusé. Client non trouvé.' });
    }

    const isMatch = await bcrypt.compare(ancienMotDePasse, client.mot_de_passe);
    if (!isMatch) {
      return res.status(400).json({ message: 'Ancien mot de passe incorrect.' });
    }

    client.mot_de_passe = await bcrypt.hash(nouveauMotDePasse, 10);
    await client.save();

    res.json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (error) {
    console.error("Erreur dans changePassword :", error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// || Fonctionnalités liées aux modules du client || //

// Obtenir les séances des modules attribués au client
exports.getSeancesModules = async (req, res) => {
  try {
    const clientId = req.user.id;
    
    // Récupérer les séances du client qui ont un module associé
    const client = await Client.findByPk(clientId, {
      include: [{
        model: Seance,
        as: 'seance',
        include: [{
          model: Module,
          attributes: ['id', 'titre', 'description']
        }]
      }]
    });

    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé.' });
    }

    // Filtrer pour n'obtenir que les séances avec modules
    const seancesAvecModules = client.seance.filter(seance => seance.Module);
    
    // Organiser les résultats par module
    const moduleMap = new Map();
    
    seancesAvecModules.forEach(seance => {
      if (seance.Module) {
        if (!moduleMap.has(seance.Module.id)) {
          moduleMap.set(seance.Module.id, {
            id: seance.Module.id,
            titre: seance.Module.titre,
            description: seance.Module.description,
            seances: []
          });
        }
        
        moduleMap.get(seance.Module.id).seances.push({
          id: seance.id,
          // Ajoutez d'autres propriétés de séance selon votre modèle
        });
      }
    });
    
    const modules = Array.from(moduleMap.values());
    res.json(modules);
  } catch (error) {
    console.error("Erreur dans getSeancesModules :", error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Obtenir les suivis du client
exports.getSuivis = async (req, res) => {
  try {
    const clientId = req.user.id;
    
    const suivis = await Suivi.findAll({
      where: { id_client: clientId },
      order: [['id', 'ASC']]
    });

    if (!suivis || suivis.length === 0) {
      return res.status(200).json([]); // Retourne un tableau vide si aucun suivi
    }

    res.json(suivis);
  } catch (error) {
    console.error("Erreur dans getSuivis :", error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Obtenir les séances du client
exports.getSeances = async (req, res) => {
  try {
    const clientId = req.user.id;
    
    const seances = await Seance.findAll({
      where: { id_client: clientId },
      order: [['id', 'ASC']]
    });

    if (!seances || seances.length === 0) {
      return res.status(200).json([]); // Retourne un tableau vide si aucune séance
    }

    res.json(seances);
  } catch (error) {
    console.error("Erreur dans getSeances :", error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Envoyer un message au psychologue
exports.envoyerMessage = async (req, res) => {
  try {
    const clientId = req.user.id;
    const { contenu } = req.body;
    
    // Récupérer d'abord le client pour obtenir l'id_psychologue
    const client = await Client.findByPk(clientId);
    
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé.' });
    }
    
    if (!client.id_psychologue) {
      return res.status(404).json({ message: 'Aucun psychologue associé à ce client.' });
    }
    
    // Créer le nouveau message
    const nouveauMessage = await Message.create({
      id_client: clientId,
      id_psychologue: client.id_psychologue,
      contenu,
      date_envoi: new Date(),
      lu: false
    });

    res.status(201).json({ 
      message: 'Message envoyé avec succès', 
      data: nouveauMessage 
    });
  } catch (error) {
    console.error("Erreur dans envoyerMessage :", error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Afficher les détails d'une séance spécifique
exports.getSeanceDetails = async (req, res) => {
  try {
    const clientId = req.user.id;
    const seanceId = req.params.id;
    
    const seance = await Seance.findOne({
      where: { 
        id: seanceId,
        id_client: clientId // Vérifier que la séance appartient bien au client
      },
      include: [{
        model: Module,
        attributes: ['id', 'titre', 'description']
      }]
    });

    if (!seance) {
      return res.status(404).json({ message: 'Séance non trouvée ou action non autorisée.' });
    }

    res.json(seance);
  } catch (error) {
    console.error("Erreur dans getSeanceDetails :", error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

