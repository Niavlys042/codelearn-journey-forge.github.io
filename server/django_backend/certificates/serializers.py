
from rest_framework import serializers
from .models import Certificate

class CertificateSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    user_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Certificate
        fields = ['id', 'user', 'course', 'course_title', 'title', 
                 'issue_date', 'certificate_id', 'expiry_date', 
                 'is_valid', 'user_name']
        read_only_fields = ['id', 'user', 'course', 'course_title', 
                           'issue_date', 'certificate_id']
    
    def get_user_name(self, obj):
        user = obj.user
        return f"{user.first_name} {user.last_name}" if user.first_name and user.last_name else user.username
