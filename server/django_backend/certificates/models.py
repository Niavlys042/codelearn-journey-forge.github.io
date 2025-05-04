
from django.db import models
from django.conf import settings

class Certificate(models.Model):
    """
    Model for user certificates.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='certificates', verbose_name="Utilisateur")
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name='certificates', verbose_name="Cours")
    title = models.CharField(max_length=255, verbose_name="Titre")
    issue_date = models.DateTimeField(auto_now_add=True, verbose_name="Date d'émission")
    certificate_id = models.CharField(max_length=50, unique=True, verbose_name="ID du certificat")
    expiry_date = models.DateTimeField(null=True, blank=True, verbose_name="Date d'expiration")
    is_valid = models.BooleanField(default=True, verbose_name="Est valide")
    
    class Meta:
        verbose_name = "Certificat"
        verbose_name_plural = "Certificats"
        unique_together = ['user', 'course']
    
    def __str__(self):
        return f"{self.user.email} - {self.course.title} - {self.certificate_id}"
