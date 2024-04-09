from django.urls import path
from .views import HouseDetailView, HouseListView, SearchView

urlpatterns = [
    path('house/', HouseListView.as_view(), name='house-list'),
    path('house/<int:pk>/', HouseDetailView.as_view(), name='house-detail'),
    path('house/search/', SearchView.as_view(), name='search'),
]
