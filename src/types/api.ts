
// Types pour l'API

// Types pour les plans d'abonnement
export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  price_monthly: number;
  price_annual: number;
  currency: string;
  features: string[];
  is_active: boolean;
}

// Types pour les paiements
export interface Payment {
  id: number;
  user: number;
  plan?: SubscriptionPlan;
  amount: number;
  currency: string;
  payment_date: string;
  payment_method: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transaction_id?: string;
}

// Types pour les abonnements
export interface Subscription {
  id: number;
  user: number;
  plan: SubscriptionPlan;
  payment: Payment;
  start_date: string;
  end_date: string;
  status: 'active' | 'expired' | 'cancelled';
  auto_renew: boolean;
}

// Types pour les cours
export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  language: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  instructor: string;
  rating: number;
  reviews_count: number;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  learning_objectives: string[];
  modules_count: number;
}

// Types pour les modules de cours
export interface Module {
  id: number;
  title: string;
  description: string;
  order_num: number;
  duration: number;
  sections: Section[];
}

// Types pour les sections de modules
export interface Section {
  id: number;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'exercise';
  content: string;
  duration: number;
  order_num: number;
}

// Types pour les parcours d'apprentissage
export interface LearningPath {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
  skill_level: 'beginner' | 'intermediate' | 'advanced';
  overview: string;
  benefits: string[];
  courses_count: number;
  total_duration: string;
}
