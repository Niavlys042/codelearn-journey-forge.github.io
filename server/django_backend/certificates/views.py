
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Certificate
from .serializers import CertificateSerializer
import uuid
from users.models import UserCourseProgress

class CertificateViewSet(viewsets.ModelViewSet):
    """
    API endpoint for certificates.
    """
    serializer_class = CertificateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Certificate.objects.filter(user=self.request.user).order_by('-issue_date')
    
    @action(detail=False, methods=['post'])
    def generate(self, request):
        """
        Generate a certificate for a completed course.
        """
        course_id = request.data.get('course_id')
        if not course_id:
            return Response({'error': 'Course ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user has completed the course
        try:
            progress = UserCourseProgress.objects.get(user=request.user, course_id=course_id)
            
            if not progress.completed and progress.progress_percentage < 100:
                return Response({
                    'error': 'Vous devez terminer le cours pour obtenir un certificat'
                }, status=status.HTTP_400_BAD_REQUEST)
            
        except UserCourseProgress.DoesNotExist:
            return Response({
                'error': 'Vous n\'êtes pas inscrit à ce cours ou vous ne l\'avez pas commencé'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if certificate already exists
        existing_cert = Certificate.objects.filter(user=request.user, course_id=course_id).first()
        if existing_cert:
            serializer = self.get_serializer(existing_cert)
            return Response(serializer.data)
        
        # Generate a new certificate
        certificate = Certificate.objects.create(
            user=request.user,
            course_id=course_id,
            title=progress.course.title,
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
                    'courseName': certificate.course.title,
                    'userName': f"{certificate.user.first_name} {certificate.user.last_name}",
                    'issueDate': certificate.issue_date
                }
            })
        else:
            return Response({
                'status': 'invalid',
                'message': 'Le certificat n\'est pas valide'
            }, status=status.HTTP_400_BAD_REQUEST)
