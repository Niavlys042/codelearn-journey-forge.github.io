
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CertificateViewSet

router = DefaultRouter()
router.register(r'certificates', CertificateViewSet, basename='certificate')

urlpatterns = [
    path('', include(router.urls)),
    path('certificates/<str:certificate_id>/public-verify/', CertificateViewSet.as_view({'get': 'public_verify'}), name='certificate-public-verify'),
]

