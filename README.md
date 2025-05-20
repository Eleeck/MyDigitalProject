# Projet Node.js - Espace Client / Psychologue

Ce projet est une application web développée avec **Node.js**, **Express**, **Sequelize** et **MySQL**. Il permet la gestion d'un espace personnel pour des clients suivis par une psychologue, incluant des modules, des blocs de contenu, des rendez-vous et des fonctions d'authentification sécurisées via JWT.

## Structure du projet

Voici une vue d'ensemble des principaux dossiers et fichiers :

📁 controllers/
└── clientController.js
└── AuthController.js

📁 middleware/
└── AuthMiddleware.js

📁 models/
└── (Fichiers Sequelize pour chaque table : Client, Module, Rdv, etc.)

📁 routes/
└── index.js
└── client/
└── psychologues/

📁 utils/
└── hashUtils.js

.env.development
.env.production
app.js
README.md



---

## 🔐 Sécurité & Hashage - `utils/hashUtils.js`

Le dossier `utils/` contient des fonctions utiles à la sécurité du projet. Le fichier `hashUtils.js` est chargé de centraliser le **hachage des mots de passe** (ou autres données sensibles) via **bcrypt**.

### Fonctionnalité

- `hashPassword(password)` : génère un hash sécurisé à partir du mot de passe fourni.
- `comparePasswords(plainPassword, hashedPassword)` : vérifie qu’un mot de passe en clair correspond à son hash.

### 🔧 Cas d'utilisation spécial

> **En cas de problème avec des éléments non cryptés déjà présents en base de données**, ce dossier permet d'ajouter un processus de migration ou de correction manuelle. Par exemple, si certains utilisateurs ont des mots de passe stockés en clair (suite à un bug), il est possible d'utiliser `hashUtils.js` pour régénérer les hashs.

---

## ⚙️ Technologies utilisées

- Node.js
- Express
- Sequelize (ORM)
- MySQL
- JWT (Authentification)
- Bcrypt (Hachage des mots de passe)
- Dotenv (Gestion des variables d’environnement)

---

## ✅ Bonnes pratiques

- Toujours hacher les mots de passe **avant** l’enregistrement en base.
- Toujours vérifier les tokens JWT via middleware.
- Ne jamais exposer d’informations sensibles dans les réponses de l’API.
- Maintenir une blacklist de tokens pour permettre un `logout` sécurisé.

---

## 📬 Contact

Pour toute question ou suggestion, veuillez contacter **Musanda Emmanuel**.


