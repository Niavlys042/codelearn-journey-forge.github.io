
from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from rest_framework.decorators import action
from .models import User, UserCourseProgress
from .serializers import UserSerializer, UserCourseProgressSerializer, RegisterSerializer, LoginSerializer
from courses.models import Course
from certificates.models import Certificate
from django.shortcuts import get_object_or_404

class IsAdminUser(permissions.BasePermission):
    """
    Permission pour les administrateurs uniquement.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_admin

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        """
        Allow admins to manage all users, but regular users can only view their own profile.
        """
        if self.action in ['list', 'create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_admin:
            return User.objects.all()
        return User.objects.filter(id=user.id)
    
    @action(detail=True, methods=['post'])
    def toggle_admin(self, request, pk=None):
        """
        Toggle admin status for a user (admin only).
        """
        if not request.user.is_admin:
            return Response({"error": "Permission refusée"}, status=status.HTTP_403_FORBIDDEN)
            
        user = self.get_object()
        user.is_admin = not user.is_admin
        user.save()
        
        serializer = self.get_serializer(user)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def toggle_premium(self, request, pk=None):
        """
        Toggle premium status for a user (admin only).
        """
        if not request.user.is_admin:
            return Response({"error": "Permission refusée"}, status=status.HTTP_403_FORBIDDEN)
            
        user = self.get_object()
        user.is_premium = not user.is_premium
        user.save()
        
        serializer = self.get_serializer(user)
        return Response(serializer.data)

class UserCourseProgressViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing user course progress.
    """
    serializer_class = UserCourseProgressSerializer
    
    def get_permissions(self):
        """
        Allow admins to view all progress, but regular users can only view their own.
        """
        if self.action == 'list':
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_admin:
            user_id = self.request.query_params.get('user_id')
            if user_id:
                return UserCourseProgress.objects.filter(user_id=user_id)
            return UserCourseProgress.objects.all()
        return UserCourseProgress.objects.filter(user=user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RegisterView(generics.CreateAPIView):
    """
    API endpoint for registering new users.
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key
        }, status=status.HTTP_201_CREATED)

class LoginView(ObtainAuthToken):
    """
    API endpoint for user authentication.
    """
    serializer_class = LoginSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'user': UserSerializer(user).data,
            'token': token.key,
            'is_admin': user.is_admin
        })

class LogoutView(APIView):
    """
    API endpoint for user logout.
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        try:
            request.user.auth_token.delete()
        except (AttributeError, Token.DoesNotExist):
            pass
        return Response({"detail": "Déconnexion réussie."}, status=status.HTTP_200_OK)

class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    API endpoint for user profile.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user

class AdminDashboardView(APIView):
    """
    API endpoint for admin dashboard statistics
    """
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        total_users = User.objects.count()
        premium_users = User.objects.filter(is_premium=True).count()
        total_courses = Course.objects.count()
        total_certificates = Certificate.objects.count()
        
        recent_users = User.objects.order_by('-date_joined')[:5]
        recent_users_data = UserSerializer(recent_users, many=True).data
        
        return Response({
            'total_users': total_users,
            'premium_users': premium_users,
            'total_courses': total_courses,
            'total_certificates': total_certificates,
            'recent_users': recent_users_data
        })
