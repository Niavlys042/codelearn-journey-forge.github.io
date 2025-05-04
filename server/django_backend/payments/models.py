
from django.db import models
from django.conf import settings

class SubscriptionPlan(models.Model):
    """
    Model for subscription plans.
    """
    BILLING_CYCLE_CHOICES = (
        ('monthly', 'Mensuel'),
        ('annual', 'Annuel'),
    )
    
    name = models.CharField(max_length=100, verbose_name="Nom")
    description = models.TextField(verbose_name="Description")
    price_monthly = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Prix mensuel")
    price_annual = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Prix annuel")
    features = models.JSONField(verbose_name="Fonctionnalités")
    is_active = models.BooleanField(default=True, verbose_name="Actif")
    
    class Meta:
        verbose_name = "Plan d'abonnement"
        verbose_name_plural = "Plans d'abonnement"
    
    def __str__(self):
        return self.name

class Payment(models.Model):
    """
    Model for payment records.
    """
    PAYMENT_STATUS_CHOICES = (
        ('pending', 'En attente'),
        ('completed', 'Terminé'),
        ('failed', 'Échoué'),
        ('refunded', 'Remboursé'),
    )
    
    PAYMENT_METHOD_CHOICES = (
        ('card', 'Carte bancaire'),
        ('orange', 'Orange Money'),
        ('airtel', 'Airtel Money'),
        ('telma', 'Mvola (Telma)'),
    )
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='payments', verbose_name="Utilisateur")
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.SET_NULL, null=True, related_name='payments', verbose_name="Plan")
    amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Montant")
    currency = models.CharField(max_length=3, default="EUR", verbose_name="Devise")
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending', verbose_name="Statut")
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, verbose_name="Méthode de paiement")
    transaction_id = models.CharField(max_length=100, blank=True, null=True, verbose_name="ID de transaction")
    payment_date = models.DateTimeField(auto_now_add=True, verbose_name="Date de paiement")
    
    class Meta:
        verbose_name = "Paiement"
        verbose_name_plural = "Paiements"
    
    def __str__(self):
        return f"{self.user.email} - {self.plan.name if self.plan else 'Plan supprimé'} - {self.amount} {self.currency}"

class Subscription(models.Model):
    """
    Model for user subscriptions.
    """
    SUBSCRIPTION_STATUS_CHOICES = (
        ('active', 'Actif'),
        ('expired', 'Expiré'),
        ('cancelled', 'Annulé'),
    )
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='subscriptions', verbose_name="Utilisateur")
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.SET_NULL, null=True, related_name='subscriptions', verbose_name="Plan")
    payment = models.OneToOneField(Payment, on_delete=models.SET_NULL, null=True, related_name='subscription', verbose_name="Paiement")
    start_date = models.DateTimeField(verbose_name="Date de début")
    end_date = models.DateTimeField(verbose_name="Date de fin")
    status = models.CharField(max_length=20, choices=SUBSCRIPTION_STATUS_CHOICES, default='active', verbose_name="Statut")
    auto_renew = models.BooleanField(default=True, verbose_name="Renouvellement automatique")
    
    class Meta:
        verbose_name = "Abonnement"
        verbose_name_plural = "Abonnements"
    
    def __str__(self):
        return f"{self.user.email} - {self.plan.name if self.plan else 'Plan supprimé'} - {self.status}"
