
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, 
    UserCourseProgressViewSet, 
    RegisterView, 
    LoginView, 
    LogoutView,
    UserProfileView
)

router = DefaultRouter()
router.register(r'progress', UserCourseProgressViewSet, basename='user-progress')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]
