from rest_framework import generics
from .models import House
from .serializers import HouseSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

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

