
// Configuration de l'application

// URL de base de l'API backend
export const API_BASE_URL = 'http://localhost:8000/api';

// Conversion de devises
export const CURRENCY_RATES = {
  EUR_TO_MGA: 4500, // 1 Euro = 4500 Ariary Malgache (approximatif)
  USD_TO_MGA: 4200  // 1 USD = 4200 Ariary Malgache (approximatif)
};

// Configuration de l'authentification
export const AUTH_CONFIG = {
  tokenKey: 'authToken',
  refreshTokenKey: 'refreshToken',
  tokenExpiry: 24 * 60 * 60 * 1000, // 24 heures en millisecondes
};

// Configuration des images
export const IMAGES_CONFIG = {
  baseUrl: '/api/media/',
  defaultAvatar: '/placeholder.svg',
  defaultCourseImage: '/placeholder.svg',
};

// Configuration des messages de l'application
export const MESSAGES = {
  errors: {
    network: "Erreur de connexion. Vérifiez votre connexion internet.",
    authentication: "Erreur d'authentification. Veuillez vous reconnecter.",
    server: "Une erreur est survenue sur le serveur. Veuillez réessayer plus tard.",
    validation: "Veuillez vérifier les informations saisies."
  }
};
