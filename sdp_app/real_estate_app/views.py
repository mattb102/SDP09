from rest_framework.views import APIView
from rest_framework import generics
from .models import House
from .serializers import HouseSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
import tensorflow as tf
import pandas as pd
from sklearn.preprocessing import StandardScaler
from django.conf import settings


class HousePagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class HouseListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = House.objects.all()
    serializer_class = HouseSerializer
    pagination_class = HousePagination

    def get_queryset(self):
        queryset = super().get_queryset()


        for key, value in self.request.query_params.items():
            if 'page' in key or key == 'max_price' or key == 'min_price':
                continue
            queryset = queryset.filter(**{key: value})
        # Filter queryset based on query parameters
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')

        if min_price is not None:
            queryset = queryset.filter(price__gte=min_price)
        if max_price is not None:
            queryset = queryset.filter(price__lte=max_price)

        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)


        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class HouseDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = House.objects.all()
    serializer_class = HouseSerializer

class PredictHousePrice(APIView):
    def post(self, request):
        # Load the saved model
        model_path = 'predictive_model'  # Update this path based on your project structure
        model = tf.keras.models.load_model(model_path)

        # Get the prediction features from the request data
        prediction_features = request.data

        # Convert prediction features to DataFrame for standard scaling
        df = pd.DataFrame(prediction_features, index=[0])

        # Scale numerical features
        scaler = StandardScaler()
        scaled_features = scaler.fit_transform(df)

        # Predict the house price
        predicted_price = model.predict(scaled_features)[0][0]

        # Return the predicted price in the response
        return Response({'predicted_price': predicted_price}, status=status.HTTP_200_OK)
