
import axios from 'axios';

// Base URL configuration - adjust this based on your environment
// In development, this should point to your Django backend
const API_BASE_URL = 'http://127.0.0.1:8000';

// Création d'une instance axios avec la configuration de base
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`, // L'URL de base pour toutes les requêtes API
  headers: {
    'Content-Type': 'application/json',
  },
  // Timeout en ms pour les requêtes
  timeout: 10000,
});

// Intercepteur pour ajouter le token d'authentification aux requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Services pour les plans d'abonnement
export const subscriptionService = {
  getPlans: () => api.get('/payments/subscription-plans/'),
  subscribe: (planId: string, paymentMethod: string) => 
    api.post('/payments/subscriptions/', { plan_id: planId, payment_method: paymentMethod }),
  getActiveSubscription: () => api.get('/payments/subscriptions/active/'),
  cancelSubscription: (subscriptionId: string) => 
    api.post(`/payments/subscriptions/${subscriptionId}/cancel/`),
};

// Services pour les cours
export const courseService = {
  getCourses: (params = {}) => api.get('/courses/courses/', { params }),
  getCourseDetails: (courseId: string) => api.get(`/courses/courses/${courseId}/`),
  getLearningPaths: () => api.get('/courses/learning-paths/'),
  getLearningPathDetails: (pathId: string) => api.get(`/courses/learning-paths/${pathId}/`),
};

// Services pour les utilisateurs
export const userService = {
  login: (email: string, password: string) => 
    api.post('/users/login/', { email, password }),
  register: (userData: any) => 
    api.post('/users/register/', userData),
  getCurrentUser: () => api.get('/users/me/'),
  updateProfile: (userData: any) => 
    api.put('/users/me/', userData),
};

// Services pour les paiements
export const paymentService = {
  createPayment: (paymentData: any) => 
    api.post('/payments/payments/', paymentData),
  getPaymentHistory: () => api.get('/payments/payments/'),
  processMobilePayment: (paymentId: string) => 
    api.post(`/payments/payments/${paymentId}/process_mobile_payment/`),
};

export default api;
