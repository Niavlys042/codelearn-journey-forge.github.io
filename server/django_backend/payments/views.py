
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import SubscriptionPlan, Payment, Subscription
from .serializers import SubscriptionPlanSerializer, PaymentSerializer, SubscriptionSerializer
from datetime import datetime, timedelta

class SubscriptionPlanViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for subscription plans.
    """
    queryset = SubscriptionPlan.objects.filter(is_active=True)
    serializer_class = SubscriptionPlanSerializer
    permission_classes = [permissions.AllowAny]

class PaymentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for payments.
    """
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user).order_by('-payment_date')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def process_mobile_payment(self, request, pk=None):
        """
        Process a mobile payment (Orange Money, Airtel Money, Mvola).
        """
        payment = self.get_object()
        
        # In a real-world scenario, you would integrate with the mobile payment provider's API
        # For this example, we'll simulate a successful payment
        
        payment.status = 'completed'
        payment.save()
        
        # Create a subscription if this is a plan payment
        if payment.plan:
            if payment.plan.name.lower() == 'annual':
                end_date = datetime.now() + timedelta(days=365)
            else:  # monthly
                end_date = datetime.now() + timedelta(days=30)
            
            Subscription.objects.create(
                user=request.user,
                plan=payment.plan,
                payment=payment,
                start_date=datetime.now(),
                end_date=end_date,
                status='active'
            )
            
            # Update user's premium status
            request.user.is_premium = True
            request.user.save()
        
        return Response({'status': 'success', 'message': 'Paiement traité avec succès'})

class SubscriptionViewSet(viewsets.ModelViewSet):
    """
    API endpoint for subscriptions.
    """
    serializer_class = SubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Subscription.objects.filter(user=self.request.user).order_by('-start_date')
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """
        Cancel a subscription.
        """
        subscription = self.get_object()
        subscription.auto_renew = False
        subscription.save()
        
        return Response({'status': 'success', 'message': 'Renouvellement automatique désactivé'})
