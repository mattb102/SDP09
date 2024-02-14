from rest_framework import generics
from .models import House
from .serializers import HouseSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class HouseListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = House.objects.all()
    serializer_class = HouseSerializer


    def get_queryset(self):
        queryset = House.objects.all()

        # Iterate over query parameters and filter queryset dynamically
        for key, value in self.request.query_params.items():
            queryset = queryset.filter(**{key: value})

        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        # Additional logic if needed when creating a new house
        # For example, setting additional fields, etc.

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class HouseDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = House.objects.all()
    serializer_class = HouseSerializer

    # Additional logic for updating or deleting a house if needed

