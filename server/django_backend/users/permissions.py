
from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    """
    Permission to only allow admin users
    """
    def has_permission(self, request, view):
        return request.user and (request.user.is_admin or request.user.is_staff)

