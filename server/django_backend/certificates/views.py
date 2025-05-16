
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Certificate
from .serializers import CertificateSerializer
import uuid
from users.models import UserCourseProgress, User

class IsAdminUser(permissions.BasePermission):
    """
    Permission pour les administrateurs uniquement.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_admin

class CertificateViewSet(viewsets.ModelViewSet):
    """
    API endpoint for certificates.
    """
    serializer_class = CertificateSerializer
    
    def get_permissions(self):
        """
        Permissions basées sur l'action:
        - Les actions administratives nécessitent des privilèges d'admin
        - Les utilisateurs peuvent voir leurs propres certificats
        """
        if self.action in ['list', 'update', 'partial_update', 'destroy', 'validate', 'invalidate']:
            permission_classes = [IsAdminUser]
        else:  # retrieve, generate, verify
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_admin:
            return Certificate.objects.all().order_by('-issue_date')
        return Certificate.objects.filter(user=self.request.user).order_by('-issue_date')
    
    @action(detail=False, methods=['post'])
    def generate(self, request):
        """
        Generate a certificate for a completed course.
        """
        course_id = request.data.get('course_id')
        if not course_id:
            return Response({'error': 'Course ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # S'il est un admin, il peut générer un certificat pour un autre utilisateur
        if request.user.is_admin and 'user_id' in request.data:
            try:
                user = User.objects.get(id=request.data.get('user_id'))
            except User.DoesNotExist:
                return Response({'error': 'Utilisateur non trouvé'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            user = request.user
        
        # Check if user has completed the course
        try:
            progress = UserCourseProgress.objects.get(user=user, course_id=course_id)
            
            if not progress.completed and progress.progress_percentage < 100 and not request.user.is_admin:
                return Response({
                    'error': 'Vous devez terminer le cours pour obtenir un certificat'
                }, status=status.HTTP_400_BAD_REQUEST)
            
        except UserCourseProgress.DoesNotExist:
            if not request.user.is_admin:
                return Response({
                    'error': 'Vous n\'êtes pas inscrit à ce cours ou vous ne l\'avez pas commencé'
                }, status=status.HTTP_400_BAD_REQUEST)
            else:
                # Les admins peuvent créer des certificats sans progression préalable
                pass
        
        # Check if certificate already exists
        existing_cert = Certificate.objects.filter(user=user, course_id=course_id).first()
        if existing_cert:
            serializer = self.get_serializer(existing_cert)
            return Response(serializer.data)
        
        # Generate a new certificate
        certificate = Certificate.objects.create(
            user=user,
            course_id=course_id,
            title=progress.course.title if 'progress' in locals() else "Cours spécial",
            certificate_id=f"CL-{uuid.uuid4().hex[:8].upper()}"
        )
        
        serializer = self.get_serializer(certificate)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['get'])
    def verify(self, request, pk=None):
        """
        Verify a certificate's authenticity.
        """
        certificate = self.get_object()
        
        if certificate.is_valid:
            return Response({
                'status': 'valid',
                'message': 'Le certificat est valide',
                'data': {
                    'certificateId': certificate.certificate_id,
                    'courseName': certificate.title,
                    'userName': f"{certificate.user.first_name} {certificate.user.last_name}",
                    'issueDate': certificate.issue_date
                }
            })
        else:
            return Response({
                'status': 'invalid',
                'message': 'Le certificat n\'est pas valide'
            }, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def validate(self, request, pk=None):
        """
        Validate a certificate (admin only).
        """
        certificate = self.get_object()
        certificate.is_valid = True
        certificate.save()
        
        return Response({
            'status': 'success',
            'message': 'Le certificat a été validé'
        })
    
    @action(detail=True, methods=['post'])
    def invalidate(self, request, pk=None):
        """
        Invalidate a certificate (admin only).
        """
        certificate = self.get_object()
        certificate.is_valid = False
        certificate.save()
        
        return Response({
            'status': 'success',
            'message': 'Le certificat a été invalidé'
        })
