
from rest_framework import serializers
from .models import SubscriptionPlan, Payment, Subscription

class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = ['id', 'name', 'description', 'price_monthly', 'price_annual', 'features', 'is_active']

class PaymentSerializer(serializers.ModelSerializer):
    plan_name = serializers.CharField(source='plan.name', read_only=True)
    
    class Meta:
        model = Payment
        fields = ['id', 'user', 'plan', 'plan_name', 'amount', 'currency', 
                 'status', 'payment_method', 'transaction_id', 'payment_date']
        read_only_fields = ['id', 'user', 'payment_date']

class SubscriptionSerializer(serializers.ModelSerializer):
    plan_name = serializers.CharField(source='plan.name', read_only=True)
    payment_id = serializers.IntegerField(source='payment.id', read_only=True)
    
    class Meta:
        model = Subscription
        fields = ['id', 'user', 'plan', 'plan_name', 'payment', 'payment_id',
                 'start_date', 'end_date', 'status', 'auto_renew']
        read_only_fields = ['id', 'user', 'plan', 'payment', 'start_date', 
                           'end_date', 'status']
