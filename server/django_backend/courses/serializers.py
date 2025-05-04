
from rest_framework import serializers
from .models import Course, Module, Section, LearningPath, PathCourse

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id', 'title', 'type', 'content', 'duration', 'order_num']

class ModuleSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Module
        fields = ['id', 'title', 'description', 'order_num', 'duration', 'sections']

class CourseSerializer(serializers.ModelSerializer):
    modules = ModuleSerializer(many=True, read_only=True)
    modules_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'image', 'language', 'level', 
                  'duration', 'instructor', 'rating', 'reviews_count', 
                  'created_at', 'updated_at', 'is_published', 
                  'learning_objectives', 'modules', 'modules_count']
    
    def get_modules_count(self, obj):
        return obj.modules.count()

class CourseListSerializer(serializers.ModelSerializer):
    """
    Simplified serializer for course listing.
    """
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'image', 'language', 'level', 
                 'duration', 'rating', 'reviews_count', 'is_published']

class PathCourseSerializer(serializers.ModelSerializer):
    course_details = CourseListSerializer(source='course', read_only=True)
    
    class Meta:
        model = PathCourse
        fields = ['id', 'course', 'course_details', 'order']

class LearningPathSerializer(serializers.ModelSerializer):
    courses = PathCourseSerializer(source='pathcourse_set', many=True, read_only=True)
    courses_count = serializers.SerializerMethodField()
    
    class Meta:
        model = LearningPath
        fields = ['id', 'title', 'description', 'image', 'slug', 
                  'skill_level', 'overview', 'benefits', 
                  'courses', 'courses_count']
    
    def get_courses_count(self, obj):
        return obj.courses.count()

class LearningPathListSerializer(serializers.ModelSerializer):
    """
    Simplified serializer for learning path listing.
    """
    courses_count = serializers.SerializerMethodField()
    total_duration = serializers.SerializerMethodField()
    
    class Meta:
        model = LearningPath
        fields = ['id', 'title', 'description', 'image', 'slug', 
                 'skill_level', 'courses_count', 'total_duration']
    
    def get_courses_count(self, obj):
        return obj.courses.count()
    
    def get_total_duration(self, obj):
        # This is a simple estimation based on course durations
        # In a real app, you might need more complex logic
        return f"{obj.courses.count() * 8} heures"
