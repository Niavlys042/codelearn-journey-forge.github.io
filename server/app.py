
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import mysql.connector
import os
import jwt
import datetime
from functools import wraps

app = Flask(__name__)
CORS(app)

# Clé secrète pour JWT (à stocker de façon sécurisée dans un vrai environnement)
app.config['SECRET_KEY'] = 'codelearn_secret_key'

# Configuration de la connexion MySQL
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="password",
        database="codelearn"
    )

# Décorateur pour vérifier le token JWT
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            token = auth_header.split(" ")[1] if len(auth_header.split(" ")) > 1 else None

        if not token:
            return jsonify({'message': 'Token manquant!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user_id = data['user_id']
        except:
            return jsonify({'message': 'Token invalide!'}), 401

        return f(current_user_id, *args, **kwargs)

    return decorated

# Routes d'authentification
@app.route('/api/auth/login', methods=['POST'])
def login():
    auth = request.get_json()

    if not auth or not auth.get('email') or not auth.get('password'):
        return make_response('Données de connexion manquantes', 401)

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SELECT * FROM users WHERE email = %s", (auth.get('email'),))
        user = cursor.fetchone()
        
        cursor.close()
        conn.close()

        if not user:
            return make_response('Utilisateur non trouvé', 401)
        
        # Dans un vrai environnement, il faudrait vérifier le mot de passe hashé
        if auth.get('password') != user['password']:  # Simplification pour l'exemple
            return make_response('Mot de passe incorrect', 401)
        
        token = jwt.encode({
            'user_id': user['id'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm="HS256")
        
        return jsonify({
            'token': token,
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email']
            }
        })
    
    except Exception as e:
        return make_response(f'Erreur: {str(e)}', 500)

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or not data.get('name') or not data.get('email') or not data.get('password'):
        return make_response('Données d\'inscription manquantes', 400)
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Vérifier si l'email existe déjà
        cursor.execute("SELECT * FROM users WHERE email = %s", (data.get('email'),))
        existing_user = cursor.fetchone()
        
        if existing_user:
            cursor.close()
            conn.close()
            return make_response('Cet email est déjà utilisé', 409)
        
        # Créer le nouvel utilisateur
        cursor.execute(
            "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
            (data.get('name'), data.get('email'), data.get('password'))  # Le mot de passe devrait être hashé
        )
        
        conn.commit()
        user_id = cursor.lastrowid
        
        cursor.close()
        conn.close()
        
        # Générer un token JWT
        token = jwt.encode({
            'user_id': user_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm="HS256")
        
        return jsonify({
            'message': 'Utilisateur créé avec succès',
            'token': token,
            'user_id': user_id
        }), 201
        
    except Exception as e:
        return make_response(f'Erreur: {str(e)}', 500)

# Routes des cours
@app.route('/api/courses', methods=['GET'])
def get_courses():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SELECT * FROM courses")
        courses = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return jsonify({'courses': courses})
        
    except Exception as e:
        return make_response(f'Erreur: {str(e)}', 500)

@app.route('/api/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SELECT * FROM courses WHERE id = %s", (course_id,))
        course = cursor.fetchone()
        
        if not course:
            cursor.close()
            conn.close()
            return make_response('Cours non trouvé', 404)
        
        # Récupérer les modules du cours
        cursor.execute("SELECT * FROM modules WHERE course_id = %s ORDER BY order_num", (course_id,))
        modules = cursor.fetchall()
        
        course['modules'] = modules
        
        cursor.close()
        conn.close()
        
        return jsonify({'course': course})
        
    except Exception as e:
        return make_response(f'Erreur: {str(e)}', 500)

# Routes des certificats
@app.route('/api/certificates', methods=['GET'])
@token_required
def get_user_certificates(current_user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("""
            SELECT c.*, cs.name as course_name 
            FROM certificates c
            JOIN courses cs ON c.course_id = cs.id
            WHERE c.user_id = %s
        """, (current_user_id,))
        
        certificates = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return jsonify({'certificates': certificates})
        
    except Exception as e:
        return make_response(f'Erreur: {str(e)}', 500)

@app.route('/api/certificates/<int:certificate_id>', methods=['GET'])
def get_certificate(certificate_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("""
            SELECT c.*, cs.name as course_name, u.name as user_name
            FROM certificates c
            JOIN courses cs ON c.course_id = cs.id
            JOIN users u ON c.user_id = u.id
            WHERE c.id = %s
        """, (certificate_id,))
        
        certificate = cursor.fetchone()
        
        if not certificate:
            cursor.close()
            conn.close()
            return make_response('Certificat non trouvé', 404)
        
        cursor.close()
        conn.close()
        
        return jsonify({'certificate': certificate})
        
    except Exception as e:
        return make_response(f'Erreur: {str(e)}', 500)

# Routes des paiements
@app.route('/api/payments', methods=['POST'])
@token_required
def create_payment(current_user_id):
    data = request.get_json()
    
    if not data or not data.get('plan_id') or not data.get('card_number'):
        return make_response('Données de paiement manquantes', 400)
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Simuler un traitement de paiement (dans un vrai environnement, utiliser une API de paiement)
        payment_status = "completed"  # Simuler une réussite
        
        # Créer l'enregistrement de paiement
        cursor.execute(
            """INSERT INTO payments 
               (user_id, plan_id, amount, status, payment_date) 
               VALUES (%s, %s, %s, %s, NOW())""",
            (current_user_id, data.get('plan_id'), data.get('amount'), payment_status)
        )
        
        # Si le paiement est réussi, créer un abonnement
        if payment_status == "completed":
            cursor.execute(
                """INSERT INTO subscriptions
                   (user_id, plan_id, start_date, end_date, status)
                   VALUES (%s, %s, NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH), 'active')""",
                (current_user_id, data.get('plan_id'))
            )
        
        conn.commit()
        payment_id = cursor.lastrowid
        
        cursor.close()
        conn.close()
        
        return jsonify({
            'message': 'Paiement traité avec succès',
            'payment_id': payment_id,
            'status': payment_status
        }), 201
        
    except Exception as e:
        return make_response(f'Erreur: {str(e)}', 500)

# Point d'entrée principal
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
