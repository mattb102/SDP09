from django.urls import path
from .views import HouseDetailView, HouseListView, PredictHousePrice

urlpatterns = [
    path('house/', HouseListView.as_view(), name='house-list'),
    path('house/<int:pk>/', HouseDetailView.as_view(), name='house-detail'),
    path('predict-price/', PredictHousePrice.as_view(), name='predict-price'),
]
