
# CodeLearn - Backend Django

Ce dossier contient le backend Django de l'application CodeLearn, une plateforme d'apprentissage de langages de programmation.

## Structure du projet

Le backend est organisé en plusieurs applications Django :

- **users** : Gestion des utilisateurs et authentification
- **courses** : Gestion des cours, modules, sections et parcours d'apprentissage
- **payments** : Gestion des paiements et abonnements
- **certificates** : Gestion des certificats

## Installation et configuration

1. Démarrer XAMPP et activer les services Apache et MySQL

2. Créer une base de données MySQL nommée `codelearn_db` :
```sql
CREATE DATABASE codelearn_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. Créer un environnement virtuel Python :
```bash
python -m venv venv
```

4. Activer l'environnement virtuel :
   - Windows : `venv\Scripts\activate`
   - macOS/Linux : `source venv/bin/activate`

5. Installer les dépendances :
```bash
pip install -r ../requirements.txt
```

6. Effectuer les migrations :
```bash
python manage.py migrate
```

7. Créer un superutilisateur :
```bash
python manage.py createsuperuser
```

8. Créer un utilisateur administrateur pour la plateforme :
```bash
python manage.py shell
```
```python
from users.models import User
User.objects.create_user(username='admin', email='admin@codelearn.com', password='admin1234', is_admin=True, is_staff=True)
exit()
```

9. Lancer le serveur de développement :
```bash
python manage.py runserver
```

Le serveur sera accessible à l'adresse [http://localhost:8000](http://localhost:8000).

## API Endpoints

### Authentification

- `POST /api/users/register/` : Inscription d'un nouvel utilisateur
- `POST /api/users/login/` : Connexion utilisateur
- `POST /api/users/logout/` : Déconnexion utilisateur
- `GET /api/users/profile/` : Récupérer le profil utilisateur
- `PUT /api/users/profile/` : Mettre à jour le profil utilisateur

### Administration

- `GET /api/users/all/` : Liste de tous les utilisateurs (admin uniquement)
- `POST /api/users/all/{id}/toggle_active/` : Activer/désactiver un utilisateur (admin uniquement)
- `POST /api/users/all/{id}/toggle_premium/` : Activer/désactiver le statut premium (admin uniquement)
- `GET /api/users/admin/dashboard/` : Statistiques pour le tableau de bord admin

### Cours

- `GET /api/courses/courses/` : Liste des cours
- `GET /api/courses/courses/{id}/` : Détails d'un cours
- `GET /api/courses/courses/{id}/progress/` : Progression de l'utilisateur sur un cours
- `POST /api/courses/courses/{id}/update_progress/` : Mettre à jour la progression
- `GET /api/courses/learning-paths/` : Liste des parcours d'apprentissage
- `GET /api/courses/learning-paths/{id}/` : Détails d'un parcours d'apprentissage
- `GET /api/courses/learning-paths/{id}/courses/` : Cours d'un parcours d'apprentissage
- `GET /api/courses/learning-paths/{id}/progress/` : Progression sur un parcours

### Paiements

- `GET /api/payments/plans/` : Liste des plans d'abonnement
- `GET /api/payments/payments/` : Historique des paiements de l'utilisateur
- `POST /api/payments/payments/` : Créer un nouveau paiement
- `GET /api/payments/subscriptions/` : Abonnements de l'utilisateur
- `POST /api/payments/subscriptions/{id}/cancel/` : Annuler le renouvellement automatique

### Certificats

- `GET /api/certificates/certificates/` : Liste des certificats de l'utilisateur
- `GET /api/certificates/certificates/{id}/` : Détails d'un certificat
- `POST /api/certificates/certificates/generate/` : Générer un certificat pour un cours terminé
- `GET /api/certificates/certificates/{id}/verify/` : Vérifier l'authenticité d'un certificat
- `GET /api/certificates/certificates/{certificate_id}/public-verify/` : Vérification publique d'un certificat

## Modèle de données

Le modèle de données comprend les entités principales suivantes :

- **User** : Utilisateurs de la plateforme, y compris administrateurs
- **Course** : Cours disponibles sur la plateforme
- **Module** : Modules composant un cours
- **Section** : Sections de contenu dans un module
- **LearningPath** : Parcours d'apprentissage (collection de cours)
- **UserCourseProgress** : Progression des utilisateurs dans les cours
- **SubscriptionPlan** : Plans d'abonnement disponibles
- **Payment** : Enregistrements des paiements
- **Subscription** : Abonnements des utilisateurs
- **Certificate** : Certificats obtenus par les utilisateurs

Pour plus de détails, consultez les fichiers `models.py` de chaque application.

