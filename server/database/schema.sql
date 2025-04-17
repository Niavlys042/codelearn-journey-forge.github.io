
-- Création de la base de données
CREATE DATABASE IF NOT EXISTS codelearn;
USE codelearn;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des plans d'abonnement
CREATE TABLE IF NOT EXISTS plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration VARCHAR(20) NOT NULL, -- monthly, annually, etc.
    features JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des abonnements
CREATE TABLE IF NOT EXISTS subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    plan_id INT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    status ENUM('active', 'expired', 'cancelled') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES plans(id)
);

-- Table des paiements
CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    plan_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'completed', 'failed', 'refunded') NOT NULL,
    payment_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES plans(id)
);

-- Table des langages de programmation
CREATE TABLE IF NOT EXISTS languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    icon VARCHAR(255), -- URL de l'icône
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des cours
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    language_id INT,
    level ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
    duration INT, -- en minutes
    image VARCHAR(255), -- URL de l'image
    price DECIMAL(10, 2),
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (language_id) REFERENCES languages(id)
);

-- Table des modules de cours
CREATE TABLE IF NOT EXISTS modules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    content TEXT,
    order_num INT NOT NULL,
    duration INT, -- en minutes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Table des progrès des utilisateurs
CREATE TABLE IF NOT EXISTS user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    module_id INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    score INT,
    completion_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);

-- Table des certificats
CREATE TABLE IF NOT EXISTS certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    issue_date TIMESTAMP NOT NULL,
    expiry_date TIMESTAMP,
    certificate_url VARCHAR(255),
    score INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Données initiales pour les plans d'abonnement
INSERT INTO plans (name, description, price, duration, features) VALUES
('Gratuit', 'Accès aux cours de base', 0.00, 'unlimited', '["Accès aux cours de base", "5 exercices par jour", "Forum communautaire"]'),
('Premium', 'Accès à tous les cours et exercices', 19.99, 'monthly', '["Accès à tous les cours", "Exercices illimités", "Défis hebdomadaires", "Certifications de base", "Support par email"]'),
('Pro', 'Expérience d\'apprentissage complète', 39.99, 'monthly', '["Tout ce qui est inclus dans Premium", "Projets pratiques guidés", "Toutes les certifications", "Sessions de mentorat (2/mois)", "Support prioritaire"]');

-- Données initiales pour les langages
INSERT INTO languages (name, description, icon) VALUES
('Python', 'Un langage polyvalent, facile à apprendre et puissant', '/images/python-icon.png'),
('JavaScript', 'Le langage de programmation du web', '/images/javascript-icon.png'),
('Java', 'Un langage orienté objet populaire pour les applications d\'entreprise', '/images/java-icon.png'),
('C++', 'Un langage de programmation puissant pour les applications performantes', '/images/cpp-icon.png'),
('PHP', 'Un langage de script côté serveur pour le développement web', '/images/php-icon.png');

-- Données initiales pour les cours
INSERT INTO courses (name, description, language_id, level, duration, image, price, is_premium) VALUES
('Python pour les Débutants', 'Apprenez les bases de Python, un langage de programmation polyvalent et facile à apprendre.', 1, 'beginner', 600, '/images/python-beginners.jpg', 0.00, FALSE),
('JavaScript Moderne et ES6+', 'Maîtrisez les fonctionnalités modernes de JavaScript pour développer des applications web interactives.', 2, 'intermediate', 900, '/images/javascript-modern.jpg', 19.99, TRUE),
('Java pour le Développement d\'Applications', 'Créez des applications robustes et évolutives avec Java, un langage orienté objet puissant.', 3, 'intermediate', 1080, '/images/java-apps.jpg', 19.99, TRUE),
('C++ Avancé et Programmation Système', 'Approfondissez vos connaissances en C++ pour développer des logiciels système performants.', 4, 'advanced', 1320, '/images/cpp-advanced.jpg', 39.99, TRUE),
('PHP et MySQL pour le Web', 'Développez des sites web dynamiques avec PHP et MySQL, le duo incontournable pour le web.', 5, 'beginner', 720, '/images/php-mysql.jpg', 0.00, FALSE);
