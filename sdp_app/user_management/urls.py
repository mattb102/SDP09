from django.urls import path
from .views import UserListView, UserDetailView
from rest_framework.authtoken.views import obtain_auth_token
urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('login/', obtain_auth_token, name='token_obtain_pair'),
]

