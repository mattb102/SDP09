from django.urls import path
from .views import HouseDetailView, HouseListView
urlpatterns = [
    path('house/', HouseListView.as_view(), name='house-list'),
    path('house/<int:pk>/', HouseDetailView.as_view(), name='house-detail'),
]
