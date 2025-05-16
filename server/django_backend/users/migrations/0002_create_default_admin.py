
from django.db import migrations
from django.contrib.auth.hashers import make_password

def create_default_admin(apps, schema_editor):
    # Importer le modèle User depuis l'application users
    User = apps.get_model('users', 'User')
    
    # Vérifier si l'administrateur existe déjà
    if not User.objects.filter(email='admincodelearn@gmail.com').exists():
        User.objects.create(
            username='admincodelearn',
            email='admincodelearn@gmail.com',
            password=make_password('admin@123!'),
            is_admin=True,
            is_staff=True,
            is_superuser=True,
            is_active=True,
            is_premium=True,
            language_preference='fr',
        )

def reverse_default_admin(apps, schema_editor):
    # Supprimer l'administrateur par défaut s'il existe
    User = apps.get_model('users', 'User')
    User.objects.filter(email='admincodelearn@gmail.com').delete()

class Migration(migrations.Migration):
    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_default_admin, reverse_default_admin),
    ]
