
from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import User, UserCourseProgress
from .serializers import (UserSerializer, AdminUserSerializer, UserCourseProgressSerializer, 
                         RegisterSerializer, LoginSerializer)
from .permissions import IsAdminUser

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_admin or user.is_staff:
            return User.objects.all()
        return User.objects.filter(id=user.id)
    
    def get_serializer_class(self):
        if self.request.user.is_admin or self.request.user.is_staff:
            return AdminUserSerializer
        return UserSerializer

    @action(detail=True, methods=['post'])
    def toggle_active(self, request, pk=None):
        """
        Toggle user active status (admin only)
        """
        if not (request.user.is_admin or request.user.is_staff):
            return Response({"detail": "Vous n'avez pas l'autorisation d'effectuer cette action."},
                           status=status.HTTP_403_FORBIDDEN)
            
        user = self.get_object()
        user.is_active = not user.is_active
        user.save()
        
        return Response({
            "id": user.id,
            "username": user.username,
            "is_active": user.is_active
        })
    
    @action(detail=True, methods=['post'])
    def toggle_premium(self, request, pk=None):
        """
        Toggle user premium status (admin only)
        """
        if not (request.user.is_admin or request.user.is_staff):
            return Response({"detail": "Vous n'avez pas l'autorisation d'effectuer cette action."},
                           status=status.HTTP_403_FORBIDDEN)
            
        user = self.get_object()
        user.is_premium = not user.is_premium
        user.save()
        
        return Response({
            "id": user.id,
            "username": user.username,
            "is_premium": user.is_premium
        })

class UserCourseProgressViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing user course progress.
    """
    serializer_class = UserCourseProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_admin or user.is_staff:
            # Admins can see all progress records
            user_id = self.request.query_params.get('user_id', None)
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
            'token': token.key
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
    API endpoint for admin dashboard statistics.
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        if not (request.user.is_admin or request.user.is_staff):
            return Response({"detail": "Vous n'avez pas l'autorisation d'accéder à cette ressource."},
                           status=status.HTTP_403_FORBIDDEN)
        
        # Collect statistics for admin dashboard
        total_users = User.objects.count()
        active_users = User.objects.filter(is_active=True).count()
        premium_users = User.objects.filter(is_premium=True).count()
        
        # Get course progress statistics
        total_progress_entries = UserCourseProgress.objects.count()
        completed_courses = UserCourseProgress.objects.filter(completed=True).count()
        
        # Get recent users
        recent_users = User.objects.all().order_by('-date_joined')[:5]
        recent_users_data = UserSerializer(recent_users, many=True).data
        
        return Response({
            "total_users": total_users,
            "active_users": active_users,
            "premium_users": premium_users,
            "total_progress_entries": total_progress_entries,
            "completed_courses": completed_courses,
            "recent_users": recent_users_data
        })

