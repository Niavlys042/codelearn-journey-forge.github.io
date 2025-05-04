
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedSimpleRouter
from .views import CourseViewSet, ModuleViewSet, SectionViewSet, LearningPathViewSet

# Main router
router = DefaultRouter()
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'learning-paths', LearningPathViewSet, basename='learning-path')

# Nested router for modules within courses
courses_router = NestedSimpleRouter(router, r'courses', lookup='course')
courses_router.register(r'modules', ModuleViewSet, basename='course-module')

# Nested router for sections within modules
modules_router = NestedSimpleRouter(courses_router, r'modules', lookup='module')
modules_router.register(r'sections', SectionViewSet, basename='module-section')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(courses_router.urls)),
    path('', include(modules_router.urls)),
]
