
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Course, Module, Section, LearningPath
from .serializers import (
    CourseSerializer, CourseListSerializer,
    ModuleSerializer, SectionSerializer,
    LearningPathSerializer, LearningPathListSerializer
)
from django.shortcuts import get_object_or_404
from users.models import UserCourseProgress
from users.serializers import UserCourseProgressSerializer

class CourseViewSet(viewsets.ModelViewSet):
    """
    API endpoint for courses.
    """
    queryset = Course.objects.filter(is_published=True)
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return CourseListSerializer
        return CourseSerializer
    
    def get_queryset(self):
        queryset = Course.objects.filter(is_published=True)
        
        # Filter by language if provided
        language = self.request.query_params.get('language', None)
        if language:
            queryset = queryset.filter(language__iexact=language)
        
        # Filter by level if provided
        level = self.request.query_params.get('level', None)
        if level:
            queryset = queryset.filter(level__iexact=level)
        
        # Search by title or description
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(title__icontains=search) | queryset.filter(description__icontains=search)
        
        return queryset
    
    @action(detail=True, methods=['get'])
    def progress(self, request, pk=None):
        """
        Get the current user's progress for this course.
        """
        course = self.get_object()
        try:
            progress = UserCourseProgress.objects.get(user=request.user, course=course)
            serializer = UserCourseProgressSerializer(progress)
            return Response(serializer.data)
        except UserCourseProgress.DoesNotExist:
            return Response({'progress_percentage': 0, 'completed': False})
    
    @action(detail=True, methods=['post'])
    def update_progress(self, request, pk=None):
        """
        Update the current user's progress for this course.
        """
        course = self.get_object()
        progress, created = UserCourseProgress.objects.get_or_create(
            user=request.user, 
            course=course
        )
        
        # Update the progress percentage if provided
        percentage = request.data.get('progress_percentage', None)
        if percentage is not None:
            progress.progress_percentage = int(percentage)
            
        # Update the completed status if provided
        completed = request.data.get('completed', None)
        if completed is not None:
            progress.completed = completed
        
        progress.save()
        serializer = UserCourseProgressSerializer(progress)
        return Response(serializer.data)

class ModuleViewSet(viewsets.ModelViewSet):
    """
    API endpoint for course modules.
    """
    serializer_class = ModuleSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        course_id = self.kwargs.get('course_pk')
        return Module.objects.filter(course_id=course_id)

class SectionViewSet(viewsets.ModelViewSet):
    """
    API endpoint for module sections.
    """
    serializer_class = SectionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        module_id = self.kwargs.get('module_pk')
        return Section.objects.filter(module_id=module_id)

class LearningPathViewSet(viewsets.ModelViewSet):
    """
    API endpoint for learning paths.
    """
    queryset = LearningPath.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return LearningPathListSerializer
        return LearningPathSerializer
    
    @action(detail=True, methods=['get'])
    def courses(self, request, pk=None):
        """
        Get all courses in this learning path.
        """
        path = self.get_object()
        courses = path.courses.filter(is_published=True)
        serializer = CourseListSerializer(courses, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def progress(self, request, pk=None):
        """
        Get the current user's progress for all courses in this learning path.
        """
        path = self.get_object()
        courses = path.courses.filter(is_published=True)
        
        progress_data = []
        total_progress = 0
        
        for course in courses:
            try:
                progress = UserCourseProgress.objects.get(user=request.user, course=course)
                total_progress += progress.progress_percentage
            except UserCourseProgress.DoesNotExist:
                progress = None
            
            progress_data.append({
                'course_id': course.id,
                'course_title': course.title,
                'progress_percentage': progress.progress_percentage if progress else 0,
                'completed': progress.completed if progress else False
            })
        
        # Calculate average progress for all courses
        avg_progress = total_progress // len(courses) if courses else 0
        
        return Response({
            'courses_progress': progress_data,
            'total_progress': avg_progress
        })
