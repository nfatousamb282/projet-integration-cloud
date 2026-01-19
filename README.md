# Projet Integration Cloud

Application full-stack Spring Boot + React pour la gestion de produits avec API REST et containerisation Docker multi-conteneurs.

## Architecture

- **Backend** : Spring Boot 3.2.0 (API REST)
- **Frontend** : React avec Vite
- **Base de données** : H2 (en mémoire)
- **Containerisation** : Docker avec Docker Compose

## Fonctionnalités

- API REST complète pour la gestion de produits (CRUD)
- Interface web React moderne et responsive
- Recherche de produits par nom
- Base de données H2 en mémoire
- Containerisation Docker multi-conteneurs
- Configuration CORS pour la communication frontend/backend

## Prérequis

- Java 17 ou supérieur
- Maven 3.6 ou supérieur
- Node.js 18+ et npm
- Docker et Docker Compose (pour la containerisation)

## Installation

### Installation locale

#### Backend

1. Aller dans le dossier backend :
```bash
cd backend
```

2. Installer les dépendances :
```bash
mvn clean install
```

3. Lancer l'application :
```bash
mvn spring-boot:run
```

Le backend sera accessible sur : http://localhost:8080

#### Frontend

1. Aller dans le dossier frontend :
```bash
cd frontend
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer l'application en mode développement :
```bash
npm run dev
```

Le frontend sera accessible sur : http://localhost:5173

### Installation avec Docker

#### Build et exécution avec Docker Compose

```bash
docker-compose up --build
```

Cette commande va :
- Build l'image Docker du backend
- Build l'image Docker du frontend
- Démarrer les deux conteneurs

**Accès aux services :**
- Frontend : http://localhost:3000
- Backend API : http://localhost:8080

#### Commandes Docker individuelles

**Backend uniquement :**
```bash
cd backend
docker build -t projet-integration-cloud-backend .
docker run -p 8080:8080 projet-integration-cloud-backend
```

**Frontend uniquement :**
```bash
cd frontend
docker build -t projet-integration-cloud-frontend .
docker run -p 3000:80 projet-integration-cloud-frontend
```

## API Endpoints

### Informations
- `GET /api/hello` - Message de bienvenue
- `GET /api/info` - Informations sur l'application

### Produits
- `GET /api/produits` - Liste tous les produits
- `GET /api/produits/{id}` - Récupère un produit par ID
- `GET /api/produits/search?nom={nom}` - Recherche des produits par nom
- `POST /api/produits` - Crée un nouveau produit
- `PUT /api/produits/{id}` - Met à jour un produit
- `DELETE /api/produits/{id}` - Supprime un produit

### Exemple de création de produit
```bash
curl -X POST http://localhost:8080/api/produits \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Laptop",
    "description": "Ordinateur portable haute performance",
    "prix": 999.99,
    "quantite": 10
  }'
```

## Structure du projet

```
.
├── backend/                      # Backend Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/example/cloud/
│   │       │       ├── ProjetIntegrationCloudApplication.java
│   │       │       ├── config/
│   │       │       │   └── CorsConfig.java
│   │       │       ├── controller/
│   │       │       │   ├── HelloController.java
│   │       │       │   └── ProduitController.java
│   │       │       ├── model/
│   │       │       │   └── Produit.java
│   │       │       ├── repository/
│   │       │       │   └── ProduitRepository.java
│   │       │       └── service/
│   │       │           └── ProduitService.java
│   │       └── resources/
│   │           ├── application.properties
│   │           └── application-docker.properties
│   ├── pom.xml
│   └── Dockerfile
├── frontend/                     # Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProduitList.jsx
│   │   │   └── ProduitForm.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   ├── Dockerfile
│   └── nginx.conf
├── Dockerfile                    # Dockerfile backend
├── docker-compose.yml            # Orchestration multi-conteneurs
└── pom.xml
```

## Technologies utilisées

### Backend
- Spring Boot 3.2.0
- Spring Web (REST API)
- Spring Data JPA
- H2 Database (base de données en mémoire)
- Lombok
- Docker

### Frontend
- React 19
- Vite
- CSS3
- Nginx (pour servir l'application en production)

## Configuration

### Backend

La configuration de l'application se trouve dans `backend/src/main/resources/application.properties`.

#### Base de données H2

La console H2 est accessible sur : http://localhost:8080/h2-console

- URL JDBC : `jdbc:h2:mem:testdb`
- Username : `sa`
- Password : (vide)

#### CORS

La configuration CORS est gérée par `CorsConfig.java` pour permettre les requêtes depuis le frontend.

### Frontend

Le frontend utilise un proxy Vite en développement et Nginx en production pour communiquer avec le backend.

## Docker

### Architecture Docker

Le projet utilise une architecture multi-conteneurs :
- **backend** : Conteneur Spring Boot
- **frontend** : Conteneur Nginx servant l'application React

Les deux conteneurs communiquent via un réseau Docker dédié.

### Commandes Docker utiles

```bash
# Build et démarrage
docker-compose up --build

# Démarrage en arrière-plan
docker-compose up -d

# Arrêter les conteneurs
docker-compose down

# Voir les logs
docker-compose logs -f

# Rebuild un service spécifique
docker-compose up --build frontend
```

## Développement

### Backend

Pour ajouter de nouvelles fonctionnalités, créez vos classes dans le package `com.example.cloud` du dossier `backend/src/main/java/com/example/cloud/`.

### Frontend

Les composants React se trouvent dans `frontend/src/components/`. Le service API est dans `frontend/src/services/api.js`.

## Notes

- En développement local, le frontend utilise le proxy Vite configuré dans `vite.config.js`
- En production Docker, Nginx fait office de proxy pour les appels API
- La base de données H2 est en mémoire, les données sont perdues au redémarrage
