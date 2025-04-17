
# CodeLearn - Plateforme d'Apprentissage de Programmation

CodeLearn est une application web d'apprentissage de langages de programmation en ligne, offrant des cours interactifs, un système d'authentification, des paiements et des certifications.

## Structure du Projet

Le projet est divisé en deux parties principales :

- **client** - Frontend React/TypeScript avec Tailwind CSS
- **server** - Backend Python avec Flask et MySQL

## Installation et Exécution

### Frontend (Client)

1. Installez les dépendances :
```bash
npm install
```

2. Lancez l'application en mode développement :
```bash
npm run dev
```

L'application sera accessible à l'adresse [http://localhost:8080](http://localhost:8080).

### Backend (Serveur)

1. Créez un environnement virtuel Python :
```bash
cd server
python -m venv venv
```

2. Activez l'environnement virtuel :
   - Windows : `venv\Scripts\activate`
   - macOS/Linux : `source venv/bin/activate`

3. Installez les dépendances :
```bash
pip install -r requirements.txt
```

4. Configurez la base de données MySQL :
```bash
mysql -u root -p < database/schema.sql
```

5. Lancez le serveur :
```bash
python app.py
```

Le serveur sera accessible à l'adresse [http://localhost:5000](http://localhost:5000).

## Fonctionnalités

- **Authentification** : Inscription et connexion des utilisateurs
- **Catalogue de Cours** : Exploration et recherche de cours par langage et niveau
- **Apprentissage Interactif** : Modules de cours structurés avec exercices pratiques
- **Système de Paiement** : Abonnements pour accéder au contenu premium
- **Certifications** : Obtention de certificats après avoir complété les cours

## Technologies Utilisées

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- Lucide React (icônes)

### Backend
- Python
- Flask
- MySQL
- JWT (authentification)

## Captures d'écran

(Des captures d'écran de l'application seraient normalement affichées ici)

## Roadmap

- Intégration de fonctionnalités supplémentaires pour les exercices interactifs
- Mise en place d'un système de forum communautaire
- Ajout de fonctionnalités sociales et de partage
- Implémentation d'un tableau de bord d'analyse pour les utilisateurs
