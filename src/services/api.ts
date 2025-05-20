
import axios from 'axios';

// Création d'une instance axios avec la configuration de base
const api = axios.create({
  baseURL: '/api', // L'URL de base pour toutes les requêtes API
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
