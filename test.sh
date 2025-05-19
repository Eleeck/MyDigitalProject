#!/bin/bash

# Authentification et récupération du token
echo "=== Test 0 : Connexion (login) psychologue ==="
RESPONSE_PSY=$(curl -s -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "R@hotmail.fr", "password": "azerty12"}')

TOKEN_PSY=$(echo "$RESPONSE_PSY" | grep -oP '"token"\s*:\s*"\K[^"]+')
echo "Token reçu : $TOKEN_PSY"
echo -e "\n-----------------------------\n"

# Requête protégée : accès à son profil
echo "=== Test 1 : Accès à une route protégée : profil en tant que psychologue ==="
curl -s -X GET http://localhost:3000/psychologue/profil \
  -H "Authorization: Bearer $TOKEN_PSY"
echo -e "\n-----------------------------\n"

# Requête protégée : accès à la liste des clients
echo "=== Test 2 : Accès à une route protégée : clients en tant que psychologue ==="
curl -s -X GET http://localhost:3000/psychologue/clients \
  -H "Authorization: Bearer $TOKEN_PSY "
echo -e "\n-----------------------------\n"

# Requête protégée : accès à la liste des modules
echo "=== Test 3 : Accès à une route protégée : modules en tant que psychologue ==="
curl -s -X GET http://localhost:3000/psychologue/modules \
  -H "Authorization: Bearer $TOKEN_PSY"
echo -e "\n-----------------------------\n"

# Associer un module à une cliente
echo "=== Test 1.4 : Association d’un module à une cliente ==="
curl -s -X POST http://localhost:3000/psychologue/modules/associer/1 \
  -H "Authorization: Bearer $TOKEN_PSY" \
  -H "Content-Type: application/json" \
  -d '{"userId": 1}'
echo -e "\n-----------------------------\n"

# Déconnexion
echo "=== Test 0 : Déconnexion (logout) : psychologue ==="
curl -s -X POST http://localhost:3000/users/logout \
  -H "Authorization: Bearer $TOKEN_PSY"
echo -e "\n-----------------------------\n"

# Requête protégée APRÈS logout
echo "=== Test 1 : Accès à une route protégée (après logout) : psychologue ==="
curl -s -X GET http://localhost:3000/psychologue/profil \
  -H "Authorization: Bearer $TOKEN_PSY"
echo -e "\n-----------------------------\n"

# Authentification et récupération du token
echo "=== Test 0 : Connexion (login) client ==="
RESPONSE_CLIENT=$(curl -s -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "Jane@hotmail.fr", "password": "azerty12"}')

TOKEN_CLIENT=$(echo "$RESPONSE_CLIENT" | grep -oP '"token"\s*:\s*"\K[^"]+')
echo "Token reçu : $TOKEN_CLIENT "
echo -e "\n-----------------------------\n"

# Requête protégée : accès à son profil
echo "=== Test 1: Accès à une route protégée : profil en tant que client ==="
curl -s -X GET http://localhost:3000/client/profil \
  -H "Authorization: Bearer $TOKEN_CLIENT"
echo -e "\n-----------------------------\n"

# Requête protégée : accès à la liste des modules
echo "=== Test 2 : Accès à une route protégée : modules en tant que client ==="
curl -s -X GET http://localhost:3000/client/modules-disponibles \
  -H "Authorization: Bearer $TOKEN_CLIENT"
echo -e "\n-----------------------------\n"

# Requête protégée : déconnexion
echo "=== Test 0 : Déconnexion (logout) : client ==="
curl -s -X POST http://localhost:3000/users/logout \
  -H "Authorization: Bearer $TOKEN_CLIENT"
echo -e "\n-----------------------------\n"


