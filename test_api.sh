#!/bin/bash

# =============================
# ⚙️ Configuration
# =============================
API_URL="http://localhost:3000"
EMAIL="marie.dupont@example.com"
PASSWORD="motdepasse123"

# =============================
# 🐳 Test de l'API
# =============================
echo "=== GET /test/ping ==="
curl -s -X GET "$API_URL/test/ping"
echo -e "\n-----------------------------\n"

# =============================
# 🔐 Connexion client
# =============================
echo "=== POST /auth/login ==="
RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}")

echo "Réponse brute :"
echo "$RESPONSE"
echo

# Extraction du token (simple grep + sed)
TOKEN=$(echo "$RESPONSE" | grep -o '"token":"[^"]*"' | sed 's/"token":"\(.*\)"/\1/')

if [ -z "$TOKEN" ]; then
  echo "❌ Échec de la connexion. Vérifie l'email et le mot de passe."
  exit 1
fi

echo "✅ Token récupéré : $TOKEN"
echo -e "\n-----------------------------\n"

# =============================
# 📋 Fonctions de test protégées
# =============================
auth_get() {
  local ENDPOINT=$1
  echo "=== GET $ENDPOINT ==="
  curl -s -X GET "$API_URL$ENDPOINT" -H "Authorization: Bearer $TOKEN"
  echo -e "\n-----------------------------\n"
}

auth_post() {
  local ENDPOINT=$1
  echo "=== POST $ENDPOINT ==="
  curl -s -X POST "$API_URL$ENDPOINT" -H "Authorization: Bearer $TOKEN"
  echo -e "\n-----------------------------\n"
}

# =============================
# 📤 Appels authentifiés
# =============================
auth_get "/client/profile"
auth_get "/client/modules"
auth_get "/client/modules/1"
auth_get "/client/modules/patient/1"
auth_get "/client/rdv"
auth_get "/client/blocks"
auth_get "/client/blocks/1/contents"
auth_post "/client/modules/1/validate"

# =============================
# 🚪 Déconnexion
# =============================
echo "=== POST /client/logout ==="
curl -s -X POST "$API_URL/client/logout" -H "Authorization: Bearer $TOKEN"
echo -e "\n-----------------------------\n"
