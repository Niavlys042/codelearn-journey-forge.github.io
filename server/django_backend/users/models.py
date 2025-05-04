
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Custom user model with additional fields for the CodeLearn platform.
    """
    email = models.EmailField(unique=True, verbose_name="Adresse e-mail")
    bio = models.TextField(blank=True, verbose_name="Biographie")
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True, verbose_name="Photo de profil")
    date_joined = models.DateTimeField(auto_now_add=True, verbose_name="Date d'inscription")
    is_premium = models.BooleanField(default=False, verbose_name="Utilisateur premium")
    
    # Paramètres utilisateurs
    language_preference = models.CharField(max_length=10, default='fr', verbose_name="Langue préférée")
    
    # Statistiques d'apprentissage
    total_learning_time = models.PositiveIntegerField(default=0, verbose_name="Temps total d'apprentissage (minutes)")
    courses_completed = models.PositiveIntegerField(default=0, verbose_name="Cours terminés")
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    class Meta:
        verbose_name = "Utilisateur"
        verbose_name_plural = "Utilisateurs"
    
    def __str__(self):
        return self.email

class UserCourseProgress(models.Model):
    """
    Model to track user progress in courses.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='course_progresses', verbose_name="Utilisateur")
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name='user_progresses', verbose_name="Cours")
    progress_percentage = models.PositiveIntegerField(default=0, verbose_name="Pourcentage de progression")
    last_accessed = models.DateTimeField(auto_now=True, verbose_name="Dernier accès")
    completed = models.BooleanField(default=False, verbose_name="Terminé")
    
    class Meta:
        verbose_name = "Progression de cours"
        verbose_name_plural = "Progressions de cours"
        unique_together = ['user', 'course']
    
    def __str__(self):
        return f"{self.user.email} - {self.course.title} - {self.progress_percentage}%"
