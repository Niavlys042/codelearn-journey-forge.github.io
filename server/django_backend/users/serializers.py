
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, UserCourseProgress

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_premium', 'is_admin',
                  'bio', 'profile_picture', 'total_learning_time', 'courses_completed']
        read_only_fields = ['id', 'is_premium', 'total_learning_time', 'courses_completed']

class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_premium', 'is_admin',
                  'is_active', 'date_joined', 'last_login', 'bio', 'profile_picture', 
                  'total_learning_time', 'courses_completed']
        read_only_fields = ['id', 'date_joined']

class UserCourseProgressSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    course_image = serializers.CharField(source='course.image', read_only=True)
    
    class Meta:
        model = UserCourseProgress
        fields = ['id', 'user', 'course', 'course_title', 'course_image', 
                  'progress_percentage', 'last_accessed', 'completed']
        read_only_fields = ['id', 'user', 'course_title', 'course_image']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password_confirm = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 'first_name', 'last_name']
    
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({"password_confirm": "Les mots de passe ne correspondent pas."})
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'})
    
    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Identifiants incorrects.")
        if not user.is_active:
            raise serializers.ValidationError("Ce compte a été désactivé.")
        return {'user': user}

